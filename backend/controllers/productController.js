const Product = require("../models/Product");


const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: "iPhone 15",
      description: "Latest Apple iPhone",
      brand: "Apple",
      category: "Mobile",
      price: 99999,
      countInStock: 10,
      image: "https://example.com/iphone.jpg",
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
};