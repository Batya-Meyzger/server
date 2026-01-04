
import mongoose from "mongoose";

const {Schema} = mongoose;
const assignmentSchema = new Schema({
title: {
    type: String,
    required: true,
    unique: true,
  },
description: {
    type: String,
    required: true
},
dueDate: {
    type: Date,
    required: true
},
createdDate: {
    type: Date,
    required: true,
    default: Date.now

}
});
assignmentSchema.virtual('isOpen').get(function() {
    return this.dueDate < new Date();
});


export const assignmentModel = mongoose.model('assignment', assignmentSchema);
