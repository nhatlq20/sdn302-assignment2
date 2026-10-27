// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
exports.getUserById = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.createUsers = async (req, res) => {
    try {
        const users = new User(req.body);
        await users.save();
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.updateUsers = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: "User not found" })
    }
}
exports.deleteUsers = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "User not found" })
    }
}
///////////////////////////////////
exports.createUser = async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email
        });
        res.redirect('/users?message=User created&type=success');
    } catch (error) {
        res.redirect(`/users?message=${encodeURIComponent(error.message)}&type=error`);
    }
}

exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        });
        res.redirect('/users');
    } catch (error) {
        res.redirect('/users');
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.redirect('/users');
    }
}

//ejs
exports.getUsers = async (req, res) => {
    try {
        const { message, type } = req.query;
        const users = await User.find().sort({ createAt: -1, createdAt: -1 });
        res.render('pages/listUsers.ejs', { 
            users, 
            query: req.query, 
            message, 
            type 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.createUserForm = async (req, res) => {
    const users = await User.find();
    res.render('pages/createUser.ejs', { users })
}