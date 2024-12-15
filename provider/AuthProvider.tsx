// provider/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import axiosInstance from "@/api";
import { useRouter } from 'expo-router'; // Importamos el router para navegar

const SESION_KEY = 'session-key'

type Session = {
    accessToken: string
    refreshToken: string
    email: string
}

type AuthProps = {
    session: Session | null
    onLogin: (email: string, password: string) => Promise<void>
    onLogout: () => Promise<void>
    initialized: boolean
}

const AuthContext = createContext<Partial<AuthProps>>({})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [session, setSession] = useState<Session | null>(null)
    const [initialized, setInitialized] = useState(false)
    const router = useRouter(); // Lo utilizaremos para navegar cuando se cambie el estado

    useEffect(() => {
        const loadSession = async () => {
            try {
                const data = await SecureStore.getItemAsync(SESION_KEY);
                if (data) {
                    const storedSession = JSON.parse(data) as Session;
                    if (storedSession) {
                        setSession(storedSession);
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

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await axiosInstance.post<Session>('/auth/login', { email, password })
            if (!result.data) return
            await SecureStore.setItemAsync(SESION_KEY, JSON.stringify(result.data))
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
            setSession(result.data)
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    const handleLogout = async () => {
        // Eliminar del storage email, accessToken, refreshToken
        await SecureStore.deleteItemAsync(SESION_KEY)
        axiosInstance.defaults.headers.common['Authorization'] = ''
        setSession(null) 
    }

    // Cada vez que session cambia si session es null y estamos inicializados, navegar a login
    useEffect(() => {
        if (initialized && !session) {

            router.replace('/(public)/login');
        }
    }, [session, initialized])

    const value = { initialized, onLogin: handleLogin, session, onLogout: handleLogout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
