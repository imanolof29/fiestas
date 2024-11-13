import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import axiosInstance from "@/api";

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

export const AuthProvider = ({ children }: any) => {

    const [session, setSession] = useState<Session | null>(null)
    const [initialized, setInitialized] = useState(false)

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
            await SecureStore.setItem(SESION_KEY, JSON.stringify(result.data))
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
            setSession(result.data)
        } catch (e) {
            //No se esta throweando el error, con lo cual al entrar al catch imprime el error y termina la funcion
            //Como no estas lanzando ninguna excepcion, en la pagina del login la funcion onLoginPress interpreta que no hay ningun fallo y navega a la pagina home

            //DEBERIAS lanzar una excepcion para recogerla en el try/catch del login
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