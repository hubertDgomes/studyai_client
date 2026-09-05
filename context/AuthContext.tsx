'use client'
import { getMe } from "@/lib/api/auth"
import { createContext, ReactNode, useEffect, useState } from "react"

export const AuthContext = createContext<any>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkInitialAuth = async () => {
            setLoading(true)
            try {
                const data = await getMe()
                setUser(data.user || data)
            }
            catch (err) {
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        }
        checkInitialAuth()
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider