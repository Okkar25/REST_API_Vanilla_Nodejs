let products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

// console.log(__dirname);
// console.log(__dirname.split("\\").slice(0, -1).join("\\"));
// console.log(__filename);
const productsFilePath =
  __dirname.split("\\").slice(0, -1).join("\\") + "\\data\\products.json";

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile(productsFilePath, products);
    resolve(newProduct);
  });
};

const update = (id, product) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile(productsFilePath, products);
    resolve(products[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile(productsFilePath, products);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
