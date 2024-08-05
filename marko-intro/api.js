import express from "express"
import mongoose from "mongoose";
import cors from "cors"
const app=(express())

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/marko")
.then(function(){
    console.log("db successfull connected");
})

const expensesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
})

const expensesModel=mongoose.model("expenses",expensesSchema)


app.post("/create/expenses",function(req,res){
    let data = req.body;

    expensesModel.create(data)
    .then(function(){
        console.log(data);
        res.send({success:true,data});
    })
})



app.listen(8000,function(){
    console.log("server running");
})








