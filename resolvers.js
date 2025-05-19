import jwt from "jsonwebtoken";
import User from "./models/User.js";
import axios from "axios";

const DUMMY_PRODUCTS = [
  { id: "1", title: "MacBook Air", price: 300000 },
  { id: "2", title: "AirPods Pro", price: 120000 },
];

const fetchProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    console.log(data)
    // The API returns the data directly as an array
    return data; 
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // return empty array on error
  }
};


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
  products: async (args, context) => context?.user && await fetchProducts(),//DUMMY_PRODUCTS,
   
//Mutation Resolvers
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