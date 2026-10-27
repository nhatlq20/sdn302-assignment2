// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        status: {
            type: String,
            enum: ["open", "in-progress", "resolved", "closed"],
            default: "open",
        },
        project: {
            type: String,

        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;