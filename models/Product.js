import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  origional_price: Number,
  discounted_price : Number,
  pieces : Number,
  inStock : Boolean,
  discount : {type : Number, default : 0},

  // add other fields...
});

// This prevents Mongoose from throwing an error if the model is already compiled during hot reloads
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;