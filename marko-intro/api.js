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




// endpoint to create expense
app.post("/create/expenses",function(req,res){
    let data = req.body;

    expensesModel.create(data)
    .then(function(){
        console.log(data);
        res.send({success:true,data});
    })
})


// endpoint to fetch all expenses

app.get("/get/all/expenses",function(req,res){
    expensesModel.find()
    .then(function(data){
        res.send({success:true,data:data})
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
})



// endpoint to delete one expense
app.delete("/delete/expense/:id",function(req,res){
    let ID = req.params.id;

    expensesModel.deleteOne({_id:ID})
    .then(function(data){
        res.send({success:true,data:data,message:"successfull deleted"})
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })

})



app.listen(8000,function(){
    console.log("server running");
})








