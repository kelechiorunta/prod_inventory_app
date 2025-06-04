import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    stockIn: {
      type: Number,
      required: true,
    },
    stockOut: {
        type: Number,
        required: true,
      },
  });
  
  const Stock = mongoose.models.Stock || mongoose.model('Stock', StockSchema);

  export default Stock