import { UserModel } from "./userModels";

function AddUser(id: string, name: string, birthdate: Date) {
   
}
async function  GetAllUsers() {
 return await UserModel.find(); 
}
