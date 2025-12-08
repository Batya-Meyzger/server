import mongoose from "mongoose";
const {Schema} = mongoose;
 const UserSchema = new Schema({
user_id: {
    type: String,
    required: true,
    unique: true,
    alias: 'userId' 
  },
user_name: {
    type: String,
    required: true},
birthday: {
    type: Date,
    required: true},
});
UserSchema.virtual('age').get(function() {

    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
});


export const UserModel = mongoose.model('User', UserSchema);