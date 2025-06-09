// File: models/Supplier.js
import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  company: { type: String },
  address: { type: String },
  logo: { type: String },
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
export default Supplier;
