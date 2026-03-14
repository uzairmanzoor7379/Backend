import { useContext } from "react";
import { SongContext } from "../songContext";
import { getsong } from "../services/songs.api";

 export function useSong() {
      const context = useContext(SongContext)
      const{setsong,setloading , song , loading} = context



      async function handleGetSong({mood}) {
        setloading(true)
           try {
             const data = await getsong({mood})
             console.log(data)
            setsong(data.song)
           } catch (error) {
            console.log(error)
           } finally{
            setloading (false)
           }
      }

      return {handleGetSong , song , loading}
}