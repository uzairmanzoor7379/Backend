import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/database.js';
import {MistralAi} from './src/services/chat.services.js'


async function server() {    
   await connectDB()
    app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
}
MistralAi()
server()

