const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { adminRouter } = require("./Routes/admin.route");
const { itemRouter } = require("./Routes/item.route");
require('dotenv').config();


const server = express();

server.use(express.json());
server.use(cors());


server.use("/admin", adminRouter);
server.use("/items", itemRouter);

server.get("/", (req,res) => {
    res.status(200).json({msg: "Homepage"});
})


server.listen(process.env.PORT, async() => {
      try{
        await connection;
        console.log("Connected to the DB");
        console.log(`Running at ${process.env.PORT} port`);
      }catch(err){
        console.log(err);
      }
})