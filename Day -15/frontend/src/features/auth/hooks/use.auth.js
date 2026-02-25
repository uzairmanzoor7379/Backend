import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";


export  function useAuth() {
     const context = useContext(AuthContext)
      const {setuser , setloading,loading} = context
       
      async function handleLogin(username , password) {
            setloading(true)
        try {
            const response = await login(username , password)
             setuser(response.user)
        } catch (error) {
             console.log(error)
        }
        finally{
            setloading(false)
        }
      }

      async function handleRegister(username , email , password , bio , isPrivate) {
            setloading(true)
        try {
            const response = await register(username , email , password , bio , isPrivate)
             setuser(response.user)
        } catch (error) {
             console.log(error)
        }
        finally{
            setloading(false)
        }
      }
     
      return (
         { handleLogin , handleRegister , loading}
      )
}