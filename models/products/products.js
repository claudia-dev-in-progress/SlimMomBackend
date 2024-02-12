const Product = require("./schema");

const getAllProducts = async () => {
  return Product.find();
};

const searchProducts = async (searchTerm) => {
  const regexPattern = new RegExp(searchTerm, "i");

  return Product.find({ title: regexPattern });
};

const getNotAllowedProducts = async (bloodType) => {
  let notAllowedProductsObj = [];
  switch (bloodType) {
    case 1:
      notAllowedProductsObj = await Product.find({
        "groupBloodNotAllowed.1": true,
      }).lean();
      break;
    case 2:
      notAllowedProductsObj = await Product.find({
        "groupBloodNotAllowed.2": true,
      }).lean();
      break;
    case 3:
      notAllowedProductsObj = await Product.find({
        "groupBloodNotAllowed.3": true,
      }).lean();
      break;
    case 4:
      notAllowedProductsObj = await Product.find({
        "groupBloodNotAllowed.4": true,
      }).lean();
      break;
    default:
      break;
  }

  const notAllowedProducts = [
    ...new Set(notAllowedProductsObj.map((product) => product.title)),
  ];

  return notAllowedProducts;
};

module.exports = {
  getAllProducts,
  searchProducts,
  getNotAllowedProducts,
};
