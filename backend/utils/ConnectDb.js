import pg from "pg"
import env from "dotenv"

env.config();

const requiredEnvVars = ["PG_USER","PG_HOST","PG_DATABASE","PG_PASSWORD","PG_PORT"];

requiredEnvVars.forEach((varName) =>{
    if(!process.env[varName]){
        console.log(`missing required env variable : ${varName}`);
        process.exit(1);
    }
})

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.connect().then(()=> console.log("conneted with database")).catch((err)=>{
    console.log("couldn't to connect database", err);
    process.exit(1);
})

db.on("error",(err)=>{
    console.log("Database Error", err);
    process.exit(1);
})

export const query = (text, params)=>db.query(text,params);