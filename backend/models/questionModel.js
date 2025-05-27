const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    session:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    question:String,
    answer:String,
    note:String,
    isPinned:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
)

const Question = mongoose.model('Question', questionSchema)
module.exports = Question