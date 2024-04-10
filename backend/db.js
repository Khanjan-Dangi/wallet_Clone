const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:dbjZVGL9g1ZmSpwU@cluster0.zlftnje.mongodb.net/paytm");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type:String,
        required: true,
        minLength: 6
    }
});

const AccountSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'user',required: true},
    balance: {type: Number,
    required: true}
})

const User = mongoose.model('user',UserSchema);
const Account = mongoose.model('account',AccountSchema);

module.exports = {
    User,Account
};