const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    role: {
        type: String,
        default: 'user'
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }] 
})

userSchema.methods.generateToken = function (next) {
    let user = this;
    console.log(user);
    let tokenData = {
        _id: user.id
    };
    let token = jwt.sign(tokenData, 'supersecret');
    user.tokens.push({
        token
    });
    return user.save().then(() => {
        return user;
    });
}


const User = mongoose.model('User', userSchema);

module.exports = {
    User
}