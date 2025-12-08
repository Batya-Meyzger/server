"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModels_1 = require("./userModels");
function AddUser(id, name, birthdate) {
}
async function GetAllUsers() {
    return await userModels_1.UserModel.find();
}
