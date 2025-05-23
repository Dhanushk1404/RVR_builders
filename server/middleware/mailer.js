import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'arun261104@gmail.com',
    pass: 'cpobfrucvhwaksta'
  }
});

// Existing admin alert
export const sendStockAlert = async (material) => {
  const mailOptions = {
    from: 'arun261104@gmail.com',
    to: 'arun261104@gmail.com',
    subject: `Low Stock Alert: ${material.name}`,
    text: `The stock for ${material.name} is low. Only ${material.Stock} units remaining.`
  };
  await transporter.sendMail(mailOptions);
};

// ✅ New: send user confirmation
export const sendUserConfirmation = async (order) => {
  const mailOptions = {
    from: 'arun261104@gmail.com',
    to: order.customer.email,
    subject: `Order Confirmation - ${order.item.name}`,
    text: `
Hi ${order.customer.name},

Thank you for your order!

Order Details:
- Item: ${order.item.name}
- Quantity: ${order.item.quantity}
- Total Amount: ₹${order.totalAmount}
- Status: ${order.status}

We will notify you when your order status changes.

Best regards,  
RVR Builders
    `
  };
  await transporter.sendMail(mailOptions);
};
