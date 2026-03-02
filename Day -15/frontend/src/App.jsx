import Allroutes from './Allroutes'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { AllpostsContext } from './features/posts/Feed.context.jsx'

import "./features/shared/global.scss"

const App = () => {
  return (
    <div>
    <AuthProvider>
      <AllpostsContext>
        <Allroutes/>
      </AllpostsContext>
    </AuthProvider>
      
    
    
    </div>
  )
}

export default App
