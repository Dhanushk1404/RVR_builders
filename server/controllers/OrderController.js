import Order from "../models/Order.js";
import Material from "../models/Material.js";

export const placeOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    let totalAmount = 0;

    // Calculate totalAmount and attach price per item
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const material = await Material.findById(item.materialId);
        if (!material) throw new Error(`Material not found: ${item.materialId}`);

        const itemPrice = material.price * item.quantity;
        totalAmount += itemPrice;

        return {
          materialId: item.materialId,
          quantity: item.quantity,
          price: itemPrice
        };
      })
    );

    const newOrder = new Order({
      customer,
      items: updatedItems,
      totalAmount,
      status: "Pending"
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (err) {
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.materialId");
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
      
      updatedOrder = await updatedOrder.populate("items.materialId");
      
      res.json({ message: "Status updated", order: updatedOrder });
      
    } catch (err) {
      res.status(500).json({ error: "Failed to update status" });
    }
  };

  
  export const getOrderHistory = async (req, res) => {
    const { email, phone } = req.query;
  
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }
  
    try {
      const orders = await Order.find({
        $or: [
          { "customer.email": email },
          { "customer.phone": phone }
        ]
      }).populate("items.materialId");
  
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch order history" });
    }
  };
  
