// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const express = require('express')

const ctrl = require('../controllers/userController')

const router = express.Router();


router.get('/', ctrl.getUsers);
router.get('/create', ctrl.createUserForm);

router.post('/create', ctrl.createUser);
router.post('/update/:id', ctrl.updateUser);
router.post('/delete/:id', ctrl.deleteUser);

router.get('/', ctrl.getAllUsers);
router.get('/:id', ctrl.getUserById);
router.post('/', ctrl.createUsers);
router.put('/:id', ctrl.updateUsers);
router.delete('/:id', ctrl.deleteUsers);


module.exports = router;

