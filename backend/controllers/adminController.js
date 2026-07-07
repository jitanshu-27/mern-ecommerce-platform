const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    const revenue = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    res.json({
      success: true,
      products,
      orders,
      users,
      revenue:
        revenue.length > 0
          ? revenue[0].total
          : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};