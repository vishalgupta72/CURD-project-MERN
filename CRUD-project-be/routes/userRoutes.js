// user routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) =>{
    try {
        const {name, email, city, age, salary} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const user = new User({name, email, city, age, salary});
        await user.save();
        res.status(201).json({message: 'User registered successfully', user});

    } catch (error) {
        res.status(500).json({ message: "error registering user", error: error.message });
    }
})

// read all users
router.get('/', async(req, res) =>{
    try {
        const users = await User.find();
        if(!users || users.length === 0){
            return res.status(404).json({message: 'No users found'});
        }
        res.status(200).json({message: 'Users fetched successfully', users});

    } catch (error) {
        res.status(500).json({ message: "error getting users", error: error.message });
    }
})


// update user
router.put('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        
        const user = await User.findByIdAndUpdate(id);
        
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const {name, email, city, age, salary} = req.body;
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (city !== undefined) user.city = city;
        if (age !== undefined) user.age = age;
        if (salary !== undefined) user.salary = salary;
        await user.save();
        res.status(200).json({message: 'User updated successfully', user});
    } catch (error) {
        res.status(500).json({ message: "error updating user", error: error.message });
    }
})


// delete user

router.delete('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully', user});
    } catch (error) {
        res.status(500).json({ message: "error deleting user", error: error.message });
    }
})

module.exports = router