import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    done : {type:Boolean,default:false},
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },

  },
  { timestamps: true }
);

const task = mongoose.models.task||mongoose.model('task', taskSchema);

export default task;
