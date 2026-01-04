
import mongoose from "mongoose";

const {Schema} = mongoose;
const submissionSchema = new Schema({
assignmentId: {
    type: Schema.Types.ObjectId, ref: 'assignment',
    required: true,
    unique: false,
  },
studentId: {
   
     type: String,
    required: true,
   
},
githubLink: {
    type: String,
    required: true
},
partner: {
    type: String,
    
},
grade: {
    type: Number,
}, 
feedback: {
    type: String,
    
}});
submissionSchema.virtual('isGraded').get(function() {
    return this.grade !== null;
});


export const submissionModel = mongoose.model('submission', submissionSchema);
