"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'userId'
    },
    user_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
});
UserSchema.virtual('age').get(function () {
    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
