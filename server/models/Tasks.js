const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema ({
    username: {
        type:String,
        required:true
    },
    tasks : {
        type:Array,
        required:false
    }
})

const TasksModel = mongoose.model('tasks',TasksSchema);

module.exports = TasksModel;