const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }

    const formattedItems = items.map((item) => ({
      event: item.event || item._id || item.id,
      title: item.title || item.name || 'Event Ticket',
      quantity: item.quantity || 1,
      price: item.price || 0
    }));

    const computedTotal = totalAmount ?? formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      user: userId,
      items: formattedItems,
      totalAmount: computedTotal
    });

    const savedOrder = await newOrder.save();

    // Includes top-level aliases to prevent 'undefined' in frontend subscribers
    res.status(201).json({
      message: 'Order placed successfully!',
      order: savedOrder,
      orderId: savedOrder._id,
      _id: savedOrder._id,
      id: savedOrder._id
    });
  } catch (error) {
    console.error('[500 Order Error]:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

router.post('/', verifyToken, createOrder);
router.post('/checkout', verifyToken, createOrder);

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

module.exports = router;