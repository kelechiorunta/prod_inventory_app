import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Product from "./models/Product.js";
import axios from "axios";

// const DUMMY_PRODUCTS = [
//   { id: "1", title: "MacBook Air", price: 300000 },
//   { id: "2", title: "AirPods Pro", price: 120000 },
// ];

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


// const resolvers = {
//   // Query Resolvers
//   // Query: {
//     auth: (parent, args, context) => {
//       // console.log('CONTEXT', context)
//       if (!context.isAuthenticated) {
//         throw new Error('Not authenticated');
//       }
//       return context.user;  // return the currently logged-in user
//     },
//     test: (parent, args, context) => context?.user ? 'Welcome Bro' : 'Test Success, GraphQL server is up & running !!',
//     users: async () => await User.find(),//   userByName: async ({ username }) => await User.findOne({ username }),
//     products: async (parent, args, context) => context?.user && await Product.find(),//.limit(5),//DUMMY_PRODUCTS,
//     getProduct: async ({ id }, context) => context?.user && await Product.findOne({ id }),
  
//     verifyPayment: async ({ token }, context) => {
//       if (context.user) {
//         try {
//           const response = await fetch(`https://api.paystack.co/transaction/verify/${token}`, {
//             headers: {
//               Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`, // use server env var
//               'Content-Type': 'application/json',
//             },
//           });

//           const data = await response.json();

//           if (!data.status) {
//             throw new Error(data.message || 'Verification failed');
//           }

//           return {
//             reference: data.data.reference,
//             amount: data.data.amount,
//             status: data.data.status,
//             customerEmail: data.data.customer.email,
//             gatewayResponse: data.data.gateway_response,
//           };
//         } catch (err) {
//           throw new Error('Payment verification failed');
//         }
//       }
//     },

//     searchProduct: async ({ name, category, sort = 'asc', limit = 10 }, context) => {
//       const query = {};

//       if (context.user) {
//         if (name) {
//           query.title = { $regex: name, $options: 'i' }; // Case-insensitive
//         }

//         if (category && category !== 'all') {
//           query.category = category;
//         }

//         const sortOption = sort === 'desc' ? -1 : 1;

//         const products = await Product.find(query)
//           .sort({ price: sortOption })//Limit sorting to the price field
//           .limit(limit);//Limit the search to 10 items

//         return products;
//       }
      
//     },
//   //  },
   
//   // Mutation: {
//     //Mutation Resolvers
//     createNewProduct: async ({ input }, context) => {
//       // if (context.user) {
//       console.log(input)
//       try {
//         const product = await new Product(input).save()
//         return product; // MUST return something
//       } catch (error) {
//         console.error("Create product error:", error);
//         return null; // This causes the GraphQL error because Product is non-nullable
//       }
//       // }
//     },

//     updateProduct: async ({ id, input }, context) => {
//       // if (!context.user) throw new Error("Not authorized");

//       try {
//         const updated = await Product.findOneAndUpdate({ id: id }, input, {
//           new: true, // return updated doc
//           // runValidators: true,
//         });

//         if (!updated) {
//           throw new Error("Failed to update product"); // <-- This is your error
//         }

//         return updated;
//       } catch (err) {
//         console.error("Update error:", err);
//         throw new Error("Failed to update product");
//       }
//     }
//     ,
  
//     deleteProduct: async ({ id }, context) => {
//       // if (!context.user) throw new Error("Not authorized");

//       try {
//         const result = await Product.deleteOne({ id });

//         if (!result) {
//           throw new Error("Failed to delete product"); // <-- This is your error
//         }

//         return result //returned Object { acknowledged, deletedCount };
//       } catch (err) {
//         console.error("Update error:", err);
//         throw new Error("Failed to delete product");
//       }
//     },

//     initializePayment: async ({ email, price }) => {
   
//       const payload = {
//         email,
//         amount: price * 1000, // Paystack expects amount in Kobo
//         currency: "NGN",
//         callback_url: "http://localhost:3301/payment/callback", // Optional
//       };

//       const response = await axios.post(
//         "https://api.paystack.co/transaction/initialize",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.data.data; // { authorization_url, access_code, reference }
//   },
    
//   roots: {
//     auth: async function* (parent, args, context) {
//       const auth = context?.user
//       while (true) {
//         // simulate a push every 3 seconds
//         await new Promise(resolve => setTimeout(resolve, 3000))
//         yield { auth: { username: "john_doe" } }
//       }
//     },
//   }
    
//   }

// // }


// export default resolvers;


import eventBus from "./eventBus.js";

const asyncIteratorFromEvent = (eventName) => {
  const iterator = {
    next: () =>
      new Promise((resolve) => {
        const handler = (payload) => {
          resolve({ value: { notifyNewProduct: payload }, done: false });
        };
        eventBus.once(eventName, handler);
      }),
    return: async () => {
      return { value: undefined, done: true };
    },
    throw: (error) => {
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return iterator;
};


const resolvers = {
  // ✅ Query Resolvers
  Query: {
    auth: (parent, args, context) => {
      if (!context.isAuthenticated) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
    test: (parent, args, context) =>
      context?.user ? 'Welcome Bro' : 'Test Success, GraphQL server is up & running !!',

    users: async () => await User.find(),
    products: async (parent, args, context) => context?.user && await Product.find(),
    getProduct: async ({ id }, context) => context?.user && await Product.findOne({ id }),

    verifyPayment: async ({ token }, context) => {
      if (context.user) {
        try {
          const response = await fetch(`https://api.paystack.co/transaction/verify/${token}`, {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          if (!data.status) throw new Error(data.message || 'Verification failed');

          return {
            reference: data.data.reference,
            amount: data.data.amount,
            status: data.data.status,
            customerEmail: data.data.customer.email,
            gatewayResponse: data.data.gateway_response,
          };
        } catch (err) {
          throw new Error('Payment verification failed');
        }
      }
    },

    searchProduct: async ({ name, category, sort = 'asc', limit = 10 }, context) => {
      const query = {};
      if (context.user) {
        if (name) query.title = { $regex: name, $options: 'i' };
        if (category && category !== 'all') query.category = category;

        const sortOption = sort === 'desc' ? -1 : 1;
        return await Product.find(query).sort({ price: sortOption }).limit(limit);
      }
    },
   },

  // ✅ Mutation Resolvers
 Mutation: {
    createNewProduct: async (parent, { input }, context) => {
      try {
        const product = await new Product(input).save();
        // Fire event manually
        eventBus.emit('PRODUCT_ADDED', product);
  
        return product;
      } catch (error) {
        console.error("Create product error:", error);
        return null;
      }
    },

    updateProduct: async (parent, { id, input }, context) => {
      try {
        const updated = await Product.findOneAndUpdate({ id }, input, { new: true });
        if (!updated) throw new Error("Failed to update product");
        return updated;
      } catch (err) {
        console.error("Update error:", err);
        throw new Error("Failed to update product");
      }
    },

    deleteProduct: async (parent, { id }, context) => {
      try {
        const result = await Product.deleteOne({ id });
        return result;
      } catch (err) {
        console.error("Delete error:", err);
        throw new Error("Failed to delete product");
      }
    },

    initializePayment: async ({ email, price }) => {
      const payload = {
        email,
        amount: price * 1000,
        currency: "NGN",
        callback_url: "http://localhost:3301/payment/callback",
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

      return response.data.data;
    },
  },

  // ✅ Subscription Resolver (Must return AsyncIterable)
  Subscription: {
    authUpdate: {
      subscribe: async function* (parent, args, context) {
        while (true) {
          yield { authUpdate: { username: context?.user?.username || "guest" } };
          await new Promise(resolve => setTimeout(resolve, 4000));
        }
      },
    },
    notifyNewProduct: {
      subscribe: async function* () {
        const queue = [];
    
        const listener = (product) => {
          if (product) queue.push(product);
        };
    
        eventBus.on('PRODUCT_ADDED', listener);
    
        try {
          while (true) {
            if (queue.length > 0) {
              const product = queue.shift();
    
              // Only yield if product is valid
              if (product) {
                yield { notifyNewProduct: product };
              }
            } else {
              await new Promise(resolve => setTimeout(resolve, 300)); // Poll every 300ms
            }
          }
        } finally {
          eventBus.off('PRODUCT_ADDED', listener);
        }
      }
    }
    
  }
  
 };

export default resolvers