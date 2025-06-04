import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const sessionUserSchema = new Schema({
    user_email: { type: String, required: true}, // You can use the user's email
    stocks: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Stock documents
        ref: 'Stock'
      }
    ],
    products_list: [
      {
        type: mongoose.Schema.Types.ObjectId, //Reference to InventoryProducts documents
        ref: 'InventoryProduct'
      }
    ],
    salesorders_list: [
      {
        type: mongoose.Schema.Types.ObjectId, //Reference to SalesOrder documents
        ref: 'SalesOrder'
      }
    ],
    suppliers_list: [
      {
        type: mongoose.Schema.Types.ObjectId, //Reference to Supplier documents
        ref: 'Supplier'
      }
    ]
  });
  
  // Create the SessionUser model
  const SessionUser = mongoose.models.SessionUser || model('SessionUser', sessionUserSchema);

  export default SessionUser