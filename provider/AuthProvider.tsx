import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import axiosInstance from "@/api";
import { jwtDecode } from "jwt-decode";

const SESION_KEY = 'session-key'

type Session = {
    accessToken: string
    refreshToken: string
    email: string
}

type AuthProps = {
    session: Session | null
    onLogin: (email: string, password: string) => Promise<any>
    onLogout: () => Promise<void>
    initialized: boolean
}

const AuthContext = createContext<Partial<AuthProps>>({})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const [session, setSession] = useState<Session | null>(null)
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const loadSession = async () => {
            try {
                const data = await SecureStore.getItemAsync(SESION_KEY);
                if (data) {
                    const storedSession = JSON.parse(data) as Session;

                    if (storedSession) {
                        checkJwt(storedSession)
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedSession.accessToken}`;
                    }
                } else {
                    console.log("No hay sesión almacenada.");
                }
            } catch (error) {
                console.error("Error al cargar la sesión:", error);
            } finally {
                setInitialized(true);
            }
        }
        loadSession()
    }, [])

    const checkJwt = async (session: Session) => {
        const decodedJwt = session.accessToken ? jwtDecode(session.accessToken) : null

        if (decodedJwt && decodedJwt.exp) {
            const remainingTime = decodedJwt.exp * 1000 - Date.now()
            if (remainingTime < 0 || remainingTime <= 10000) {
                console.log("Access token has expired or has 5 minutes remaining. Refreshing token...")
                const newSession = await refreshAuth(session.refreshToken)
                if (newSession) {
                    console.log("New access token received. Updating auth state")
                    await SecureStore.deleteItemAsync(SESION_KEY)
                    await SecureStore.setItem(SESION_KEY, JSON.stringify(newSession))
                    setSession(newSession)
                    setInitialized(true)
                } else {
                    console.log("Refresh token expired. Deleting auth data...")
                    await SecureStore.deleteItemAsync(SESION_KEY)
                    setInitialized(true)
                }
            }
        } else {
            setInitialized(true)
        }

    }

    const refreshAuth = async (refreshToken: string): Promise<Session | null> => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
            const result = await axiosInstance.post<Session>('/auth/refresh');
            if (!result.data) {
                return null;
            }

            await SecureStore.setItemAsync(SESION_KEY, JSON.stringify(result.data));

            return result.data
        } catch (error) {
            console.error('Error refreshing auth:', error instanceof Error ? error.message : error);
            return null;
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await axiosInstance.post<Session>('/auth/login', { email, password })
            if (!result.data) return
            await SecureStore.setItem(SESION_KEY, JSON.stringify(result.data))
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
            setSession(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = async () => {
        setSession(null)
        await SecureStore.deleteItemAsync(SESION_KEY)
        axiosInstance.defaults.headers.common['Authorization'] = ''
    }

    const value = { initialized, onLogin: handleLogin, session, onLogout: handleLogout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}