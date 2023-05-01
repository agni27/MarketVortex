const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');

//Handling Uncaught Exception(Ex-putting console.log and putting a string without "")
process.on("uncaughtException",(err)=>{
    console.log(`Error: $(err.message)`)
    console.log("Shutting down the server due to Uncaught Exception")
    process.exit(1)
})


//Config
dotenv.config({path:'backend/config/config.env'});

//Connecting to database

connectDatabase();
const server=app.listen(process.env.PORT,()=>{   
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
}
    )


//Unhandled promise rejection(If the .env files aren't proper, we get this error)
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")
    server.close(()=>{process.exit(1)})
})