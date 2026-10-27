// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const Report = require('../models/Report')
const User = require('../models/User')


// Lấy danh sách report
exports.getAllReports = async (req, res) => {
    try {
        const { project, status, severity } = req.query;
        const filter = {};

        if (project && project.trim() !== '') {
            const escapedProject = project.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.project = { $regex: escapedProject, $options: 'i' };
        }
        if (status && status.trim() !== '') {
            filter.status = status.trim();
        }
        if (severity && severity.trim() !== '') {
            filter.severity = severity.trim();
        }

        const reports = await Report.find(filter)
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Lấy report theo ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Tạo report mới (LỆNH NÀY SẼ TỰ ĐỘNG TẠO DB VÀ COLLECTION TRONG MONGODB)
exports.createReport = async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// Cập nhật report

exports.updateReports = async (req, res) => {
    try {
        const { title, description, severity, status, project } = req.body;
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { title, description, severity, status, project },
            { new: true }
        );
        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" })
        }
        res.status(200).json(updatedReport)
    } catch (error) {
        res.status(500).json({ message: "Report not found" })
    }
}
exports.deleteReport = async (req, res) => {
    try {
        const deleteReport = await Report.findByIdAndDelete(req.params.id);
        if (!deleteReport) {
            return res.status(404).json({ message: "Report not found" })
        }
        res.status(200).json({ message: "Report deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Report not found" })
    }
}

///////////////////////////////////
exports.createReport = async (req, res) => {
    try {
        await Report.create({
            title: req.body.title,
            description: req.body.description || req.body.title,
            project: req.body.project,
            severity: req.body.severity || 'low',
            status: req.body.status || 'open',
            assignedTo: req.body.assignedTo
        });
        res.redirect('/reports?message=Report created&type=success');
    } catch (error) {
        res.redirect(`/reports?message=${encodeURIComponent(error.message)}&type=error`);
    }
}


exports.updateReport = async (req, res) => {
    try {
        const { title, description, project, severity, status, assignedTo } = req.body;
        await Report.findByIdAndUpdate(req.params.id, {
            title,
            description,
            project,
            severity,
            status,
            assignedTo,
            updatedAt: new Date()
        });
        res.redirect('/reports?message=Report updated&type=success');
    } catch (error) {
        res.redirect(`/reports?message=${encodeURIComponent(error.message)}&type=error`);
    }
}

exports.deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.redirect('/reports?message=Report deleted&type=success');
    } catch (error) {
        res.redirect(`/reports?message=${encodeURIComponent(error.message)}&type=error`);
    }
}

//ejs
exports.getReports = async (req, res) => {
    try {
        const { project, status, severity, message, type } = req.query;
        const filter = {};

        if (project && project.trim() !== '') {
            const escapedProject = project.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.project = { $regex: escapedProject, $options: 'i' };
        }
        if (status && status.trim() !== '') {
            filter.status = status.trim();
        }
        if (severity && severity.trim() !== '') {
            filter.severity = severity.trim();
        }

        const reports = await Report.find(filter)
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });

        res.render('pages/listReports', {
            reports,
            query: req.query,
            message,
            type
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.createReportsForm = async (req, res) => {
    const users = await User.find();
    const reports = await Report.find();
    res.render('pages/createReport.ejs', { users, reports });
}

exports.editReportForm = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('assignedTo');
        if (!report) {
            return res.redirect('/reports');
        }
        const users = await User.find();
        res.render('pages/editReport.ejs', { report, users });
    } catch (error) {
        res.redirect('/reports');
    }
}