import Allroutes from './Allroutes'
import { AuthProvider } from './features/auth/auth.context.jsx'

import "./features/shared/global.scss"

const App = () => {
  return (
    <div>
    <AuthProvider>
      <Allroutes/>
    </AuthProvider>
      
    
    
    </div>
  )
}

export default App
