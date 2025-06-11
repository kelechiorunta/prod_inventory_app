// models/WeeklySalesReport.js
import mongoose from 'mongoose';

const SaleSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    required: true,
  },
  hour: { type: String, required: true }, // e.g., "09:00"
  value: { type: Number, default: 0 },
});

const WeeklySalesReportSchema = new mongoose.Schema({
  weekRange: { type: String, required: true }, // e.g., "Aug 19-25"
  year: { type: Number, required: true },
  slots: [SaleSlotSchema],
});

const WeeklySalesReport =
  mongoose.models.WeeklySalesReport ||
  mongoose.model('WeeklySalesReport', WeeklySalesReportSchema);

export default WeeklySalesReport;