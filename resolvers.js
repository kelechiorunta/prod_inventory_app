import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Product from "./models/Product.js";
import axios from "axios";

const DUMMY_PRODUCTS = [
  { id: "1", title: "MacBook Air", price: 300000 },
  { id: "2", title: "AirPods Pro", price: 120000 },
];

// No need to call this anymore as the products from the api are now in
// the database
// const fetchProducts = async () => {
//   try {
//     const res = await fetch('https://fakestoreapi.com/products');
//     const data = await res.json();
//     console.log(data)
//     data && data.map(async (product) => await new Product(product).save())
//     // The API returns the data directly as an array
//     return data; 
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     return []; // return empty array on error
//   }
// };


const resolvers = {
    // Query Resolvers
  auth: (args, context) => {
      if (!context.isAuthenticated) {
        throw new Error('Not authenticated');
      }
      return context.user;  // return the currently logged-in user
    },
  test: (args, context) => context?.user? 'Welcome Bro' : 'Test Success, GraphQL server is up & running !!',
  users: async () => await User.find(),//   userByName: async ({ username }) => await User.findOne({ username }),
  products: async (args, context) => context?.user && await Product.find(),//DUMMY_PRODUCTS,
  getProduct: async ({id}, context) => context?.user && await Product.findOne({id}),
   
  //Mutation Resolvers
  createNewProduct: async ({ input }, context) => {
    if (context.user) {
      console.log(input)
      try {
        const product = await new Product(input).save()
        return product; // MUST return something
    } catch (error) {
        console.error("Create product error:", error);
        return null; // This causes the GraphQL error because Product is non-nullable
    }
    }
  },

  updateProduct: async ({ id, input }, context) => {
    if (!context.user) throw new Error("Not authorized");

    try {
      const updated = await Product.findOneAndUpdate({ id: id }, input, {
        new: true, // return updated doc
        // runValidators: true,
      });

      if (!updated) {
        throw new Error("Failed to update product"); // <-- This is your error
      }

      return updated;
    } catch (err) {
      console.error("Update error:", err);
      throw new Error("Failed to update product");
    }
  }
  ,
  
  deleteProduct: async ({ id }, context) => {
    if (!context.user) throw new Error("Not authorized");

    try {
      const result = await Product.deleteOne({id});

      if (!result) {
        throw new Error("Failed to delete product"); // <-- This is your error
      }

      return result //returned Object { acknowledged, deletedCount };
    } catch (err) {
      console.error("Update error:", err);
      throw new Error("Failed to delete product");
    }
  },

  initiatePayment: async ({ email, productId } ) => {
      const product = DUMMY_PRODUCTS.find(p => p.id === productId);
      if (!product) throw new Error("Product not found");

      const payload = {
        email,
        amount: product.price * 100, // Paystack expects amount in Kobo
        currency: "NGN",
        callback_url: "http://localhost:3001/payment/callback", // Optional
      };

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data; // { authorization_url, access_code, reference }
  },
    
  }

// };

export default resolvers;