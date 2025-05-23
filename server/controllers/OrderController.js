import Order from "../models/Order.js";
import Material from "../models/Material.js";

export const placeOrder = async (req, res) => {
  try {
    const { customer, item } = req.body; // item = { materialId, quantity }

    const material = await Material.findById(item.materialId);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    if (item.quantity > material.Stock) {
      return res.status(400).json({ error: `Only ${material.Stock} units available in stock` });
    }

    const itemPrice = material.price;
    const totalAmount = itemPrice * item.quantity;

    const newOrder = new Order({
      customer,
      item: {
        materialId: item.materialId,
        quantity: item.quantity,
        name: material.name,
        price: itemPrice
      },
      totalAmount,
      status: "Pending"
    });

    // Update stock after placing order
    material.Stock -= item.quantity;
    await material.save();

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (err) {
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("item.materialId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const allowedStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
  
    try {
      let updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      updatedOrder = await updatedOrder.populate("item.materialId");
      
      res.json({ message: "Status updated", order: updatedOrder });
      
    } catch (err) {
      res.status(500).json({ error: "Failed to update status" });
    }
  };

  
  export const getOrderHistory = async (req, res) => {
    const { email, phone } = req.query; 
    console.log(email); 
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }
  
    try {
      const orders = await Order.find({
        $or: [
          { "customer.email": email },
          { "customer.phone": phone }
        ]
      }).populate("item.materialId");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch order history" });
    }
  };
  
