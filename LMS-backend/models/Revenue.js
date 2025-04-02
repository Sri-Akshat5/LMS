const mongoose = require("mongoose");

const RevenueSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalEarnings: {
        type: Number,
        required: true,
        default: 0 // Ensure a default value
    },
    commission: {
        type: Number,
        required: true
    },
    netEarnings: {
        type: Number,
        default: function () {
            return this.totalEarnings - this.commission;
        }
    },
    transactions: [
        {
            amount: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

// Pre-save hook to calculate net earnings before saving
RevenueSchema.pre("save", function (next) {
    if (typeof this.totalEarnings !== "number" || typeof this.commission !== "number") {
        return next(new Error("totalEarnings and commission must be numbers"));
    }
    this.netEarnings = this.totalEarnings - this.commission;
    next();
});

module.exports = mongoose.model("Revenue", RevenueSchema);
