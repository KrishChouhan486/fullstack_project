import dotenv from "dotenv"
import {app} from "./aap.js"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./.env",
})

const PORT = process.env.PORT || 8002

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on ports ${PORT}`)
        })
})
.catch((err)=>{
    console.log("Mongodb connection error", err)
})

