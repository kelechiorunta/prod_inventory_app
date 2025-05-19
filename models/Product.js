const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    id: { type: Number, required: false }, // Serial ID
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true, min: 0 }
  }
}, {
  timestamps: true
});

// Apply the auto-increment plugin
productSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;

// // Ensure unique email index