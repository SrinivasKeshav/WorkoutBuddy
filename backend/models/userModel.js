const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

userSchema.statics.signup = async function(email, password){

    if(!email || !password){
        throw Error('Email or password cannot be empty');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already exists');
    }
    
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await this.create({email, password : hash});
    return user
}

userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw Error('Email or password cannot be empty');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Invalid email or password');
    }

    return user

}

module.exports =  mongoose.model('User', userSchema);