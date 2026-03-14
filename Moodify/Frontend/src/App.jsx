import "./features/shared/global.scss"
import {RouterProvider} from "react-router-dom"
import { router } from "./Allroutes"
import {  AuthProvider } from "./features/auth/authContext.jsx"
import { SongContextProvider } from "./features/home/songContext.jsx"
const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
<RouterProvider router={router}/>
      </SongContextProvider>
      
    </AuthProvider>
    
  )
}

export default App

