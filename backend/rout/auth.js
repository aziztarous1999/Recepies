const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');


router.post('/register',async (req,res)=>{
    // *** Validation ***

    // Check if user Exist
    const userExist = await User.findOne({email:req.body.email});
    console.log(userExist);
    if(userExist) return res.status(400).send('Email Already Exist!')


    // user Validation using joi
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // Create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try{
        const savedUser = await user.save();
        res.send({user:savedUser.id});
    }catch(err){
        res.status(400).send(err);
    }

});

module.exports = router;