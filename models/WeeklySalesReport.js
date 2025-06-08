import mongoose from 'mongoose';

const SaleSlotSchema = new mongoose.Schema({
  day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  hour: { type: String }, // e.g., "09:00", "15:00"
  value: { type: Number, default: 0 },
});

const WeeklySalesReportSchema = new mongoose.Schema({
  weekRange: { type: String }, // e.g., "Aug 19-25"
  year: { type: Number },
  slots: [SaleSlotSchema],
});

const WeeklySalesReport = mongoose.models.WeeklySalesReport || mongoose.model('WeeklySalesReport', WeeklySalesReportSchema);
export default WeeklySalesReport