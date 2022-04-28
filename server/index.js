const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');
const UserTasks = require('./models/Tasks');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kv2461:LTYGr2zzy86W21Hw@cluster0.htfej.mongodb.net/merntutorial?retryWrites=true&w=majority')

app.get('/getTasks', (req,res)=>{
    const _id = req.query._id;
    UserTasks.find({_id:_id},(err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post('/createTasks', async(req,res)=>{
    const tasks = req.body;
    const newTasks = new UserTasks(tasks);
    
    try{await newTasks.save().then((task)=> {
        res.json(task)
    });
    } catch (error){
        console.log(error);
    }
})

app.listen(3001,()=>{
    console.log('server is running on 3001')
})