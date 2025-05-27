import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },     // user ID or username
  receiver: { type: String, required: true },   // user ID or username
  createdAt: { type: Date, default: Date.now },
});

// export const Message = mongoose.model('Message', messageSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;