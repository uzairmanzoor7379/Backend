import { createContext } from "react"
import { useState } from "react"
export const SongContext = createContext()
export function SongContextProvider({children}) {
    const [song, setsong] = useState({
  "url": "https://ik.imagekit.io/uzair/cohort-2/moodify/songs/Pal_Pal_KoshalWorld.Com__qhbW9qmFm.mp3",
  "Posterurl": "https://ik.imagekit.io/uzair/cohort-2/moodify/posters/Pal_Pal_KoshalWorld.Com__8e8vJEViR.jpeg",
  "title": "Pal Pal(KoshalWorld.Com)",
  "mood": "sad",
  
    })
    const [loading, setloading] = useState(false)

    return(
        <SongContext.Provider value={{
            song , setsong , loading , setloading
        }}>
          {children}
        </SongContext.Provider>
    )
    
}