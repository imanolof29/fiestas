import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import axiosInstance from "@/api";
import { jwtDecode } from "jwt-decode";

type Session = {
    accessToken: string;
    refreshToken: string;
    email: string;
}

type JwtPayload = {
    exp: number;
    email: string;
    [key: string]: any;
}

type AuthProps = {
    session: Session | null;
    login: (email: string, password: string) => Promise<boolean>;
    signInWithGoogle: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<boolean>
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Constants
const SESSION_KEY = 'user_session';
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes before expiration

// Create context with default values
const AuthContext = createContext<AuthProps>({
    session: null,
    login: async () => false,
    signInWithGoogle: async () => { },
    register: async () => false,
    logout: async () => { },
    isAuthenticated: false,
    isLoading: true
});

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load session on app start
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedSessionJson = await SecureStore.getItemAsync(SESSION_KEY);

                if (storedSessionJson) {
                    const storedSession: Session = JSON.parse(storedSessionJson);

                    // Validate token before setting session
                    const isValidToken = await validateToken(storedSession.accessToken);

                    if (isValidToken) {
                        setSession(storedSession);
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedSession.accessToken}`;
                    } else {
                        await refreshSession(storedSession.refreshToken);
                    }
                }
            } catch (error) {
                console.error('Authentication initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Token validation method
    const validateToken = async (token: string): Promise<boolean> => {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            return Date.now() < decodedToken.exp * 1000;
        } catch {
            return false;
        }
    };

    // Refresh session method
    const refreshSession = async (refreshToken: string): Promise<boolean> => {
        try {
            // Set refresh token as Bearer token for refresh request
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;

            const response = await axiosInstance.post<Session>('/auth/refresh');

            if (response.data) {
                const newSession = response.data;

                // Save new session
                await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(newSession));
                setSession(newSession);

                // Update axios default header with new access token
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newSession.accessToken}`;

                return true;
            }

            // If refresh fails, logout
            await logout();
            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await logout();
            return false;
        }
    };

    const signInWithGoogle = async (idToken: string) => {
        try {
            const response = await axiosInstance.post<Session>('/auth/google', { idToken });

            if (response.data) {
                const newSession = response.data;

                // Save session
                await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(newSession));
                setSession(newSession);

                // Update axios default header
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newSession.accessToken}`;
            }
        } catch (error) {
            console.error('Google sign in failed:', error);
        }
    }

    // Login method
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await axiosInstance.post<Session>('/auth/login', { email, password });

            if (response.data) {
                const newSession = response.data;

                // Save session
                await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(newSession));
                setSession(newSession);

                // Update axios default header
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newSession.accessToken}`;

                return true;
            }

            return false;
        } catch (error) {
            console.error('Login failed:', error);
            throw error
        }
    };

    const register = async (firstName: string, lastName: string, username: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await axiosInstance.post<Session>('/auth/create', { firstName, lastName, username, email, password });

            if (response.data) {
                const newSession = response.data;

                // Save session
                await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(newSession));
                setSession(newSession);

                // Update axios default header
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newSession.accessToken}`;

                return true;
            }

            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    // Logout method
    const logout = async () => {
        // Simply clear local session and storage
        await SecureStore.deleteItemAsync(SESSION_KEY);
        setSession(null);

        // Clear Authorization header
        axiosInstance.defaults.headers.common['Authorization'] = '';
    };

    // Compute authentication status
    const isAuthenticated = !!session;

    return (
        <AuthContext.Provider
            value={{
                session,
                login,
                logout,
                isAuthenticated,
                isLoading,
                register,
                signInWithGoogle
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};