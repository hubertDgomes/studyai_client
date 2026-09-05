
import { AuthContext } from "@/context/AuthContext"
import { getMe, login, logout, signUp } from "@/lib/api/auth"
import { useContext } from "react"

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { user, setUser, loading, setLoading } : any = context

    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        setLoading(true)
        try {
            const res = await login({ email, password })
            const loginUser = res.user || res.data || res
            setUser(loginUser)
            return loginUser
        }
        catch (err) {
            setUser(null)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleSignUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        setLoading(true)
        try {
            const res = await signUp({ name, email, password })
            return res
        }
        catch (err) {
            setUser(null)
            // console.log("Sign up response:", err)
            throw err

        }
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        }
        catch (err) {
            console.log(err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }


    const checkUser = async () => {
        setLoading(true)
        try {
            const res = await getMe()
            const userData = res.data || res.user || res
            setUser(userData)
            return userData
        }
        catch (err) {
            setUser(null)
            return null
        }
        finally {
            setLoading(false)
        }
    }

    return {
        user , setUser  , loading , setLoading , handleLogin , handleLogout , handleSignUp , checkUser
    }
}

export default useAuth