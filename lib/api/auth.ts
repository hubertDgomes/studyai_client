import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:4000",
    withCredentials : true
})  

export const signUp = async ({name , email , password} : {name : string ; email : string ; password : string}) => {
    try{
        const res = await api.post("/api/signup" ,{name , email ,password})
        // console.log("Sign up response:", res.data.message)
        return res.data
    }
    catch(err:any){
        console.log(err.response?.data?.message || err.message || "Sign up failed")
        throw err
    }
}

export const login = async ({email , password} : {email : string ; password : string}) => {
    try{
        const res = await api.post("/api/login" , {email , password})
        return res.data
    }
    catch(err:any){
        console.log(err.response?.data?.message || err.message || "Login failed")
        throw err
    }
}

export const logout = async () => {
    try{
        const res = await api.get("/api/logout")
        return res.data
    }
    catch(err:any){
        console.error(err.message)
        throw err
    }
}

export const getMe = async () => {
    try{
        const res = await api.get("/api/get-me")
        return res.data
    }
    catch(err:any){
        console.error(err.message)
        throw err
    }
}

export default {signUp , login, logout , getMe}