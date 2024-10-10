import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    products: { type: Array, required: true }, // Array to hold product details
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    total_amount: { type: Number, required: true }, // Total amount of the order
    address: { type: String, required: true }, // Delivery address
    createdAt: { type: Date, default: Date.now }, // Timestamp of order creation
});

export default mongoose.model('Order', OrderSchema);
