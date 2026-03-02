import { createContext, useState } from "react";
 export const PostContext = createContext()
export function AllpostsContext({children}) {
    const [loading, setloading] = useState(false)
    const [post, setpost] = useState([])
    const [allposts, setallposts] = useState([])





    return(
       <PostContext.Provider value={{loading , setloading , post , setpost ,allposts , setallposts}}>

      {children}
       </PostContext.Provider>

    )

}