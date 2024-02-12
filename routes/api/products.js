const express = require("express");
const {
  getAllProducts,
  searchProducts,
} = require("../../models/products/products");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await getAllProducts();

    res.status(200).json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    console.info(error);
    res.status(500).json({
      status: "error",
      code: 404,
    });
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    const products = await searchProducts(searchTerm);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

module.exports = router;
