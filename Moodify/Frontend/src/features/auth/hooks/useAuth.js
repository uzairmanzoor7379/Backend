import { useContext } from "react";
import { AuthContext } from "../authContext.jsx";
import { getMe, login, logout, register } from "../services/auth.api";
import { useEffect } from "react";

 export function useAuth() {
     const context = useContext(AuthContext)
     console.log(context)
     const {user, setuser, loading , setloading} = context


     async function handleRegister(username , email , password) {
        setloading(true)
        try {
            const data = await register(username , email , password)
        setuser(data.user)
        } catch (error) {
            throw new Error(error);
            
        } finally{
            setloading(false)
        }
     }
     async function handlelogin(username ,password , email) {
       setloading(true)
        try {
            const data = await login(username , email , password)

        setuser(data.user)
        } catch (error) {
            throw new Error(error);
            
        }finally{
            setloading(false)
        }
     }
     async function handleLogout() {
        setloading(true)
        try {
             await logout()
        setuser(null)
        } catch (error) {
            throw new Error(error);
            
        }
        finally{
            setloading(false)
        }
     }
      async function handleGetMe() {
        setloading(true)
        try {
             const data = await getMe()
        setuser(data.user)
        } catch (error) {
            throw new Error(error);
            
        }finally{
            setloading(false)
        }
     }
      useEffect(()=>{
        handleGetMe()
      },[])
     return{
       user , loading , handleGetMe , handleLogout , handleRegister , handlelogin
     }
}