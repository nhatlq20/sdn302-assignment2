// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const express = require('express')
const ctrl = require('../controllers/reportController')
const router = express.Router();

// routing path ejs
router.get('/', ctrl.getReports);
router.get('/create', ctrl.createReportsForm);
router.get('/edit/:id', ctrl.editReportForm);

// routing path form
router.post('/create', ctrl.createReport);
router.post('/update/:id', ctrl.updateReport);
router.post('/edit/:id', ctrl.updateReport);
router.post('/delete/:id', ctrl.deleteReport);

// routing path postman
router.get('/', ctrl.getAllReports);
router.post('/', ctrl.createReport);
router.get('/:id', ctrl.getReportById);
router.put('/:id', ctrl.updateReports);
router.delete('/:id', ctrl.deleteReport);


module.exports = router;
