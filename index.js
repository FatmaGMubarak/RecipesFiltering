require('dotenv').config();
const fs = require('fs')
const express = require('express');
const app = express();

const port =process.env.PORT;
app.listen(port,()=>{
    console.log(`Server ${port} is running`)
})

app.use(express.json())

app.post("/",(req,res)=>{
    const {category} =req.body
    fs.readFile("database.json",'utf8',(err,data)=>{
        if (err) res.status(400).json({err})
            if (data){
                const parsedData = JSON.parse(data)
                let recipes = parsedData["recipes"]
                let filterdRecipes =recipes.filter((e)=>e.category == category)
                        res.status(201).json({data:filterdRecipes})

            }
    })
})

app.post("/",(req,res)=>{
    const {price} = req.body
    fs.readFile("database.json","utf8",(err,data)=>{
        if (err) res.status(400).json({err})
            if (data){
                const parsedData = JSON.parse(data)
                let recipes = parsedData["recipes"]
                let threshold = recipes.filter((e)=>e.price >= price)
                res.status(201).json({data:threshold})
            }
    })
})
