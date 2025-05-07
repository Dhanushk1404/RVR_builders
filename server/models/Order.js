import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
      email: String
    },
    item:
      {
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material"
        },
        name:String,
        quantity: Number,
        price: Number
      }
    ,
    totalAmount: Number,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true } 
);

export default mongoose.model("Order", OrderSchema);
