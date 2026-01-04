

import mongoose from "mongoose";

const {Schema} = mongoose;
const UserSchema = new Schema({
userId: {
    type: String,
    required: true,
    unique: true,
  },
name: {
    type: String,
    required: true,
   
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    unique: true,
},
role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
}, 
classid: {
    type: String,
    
  }
});  

export const userModel = mongoose.model('user', UserSchema);
