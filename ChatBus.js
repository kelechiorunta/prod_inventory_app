// // eventBus.js
// export class ChatBus {
//     constructor() {
//       this.listeners = {};
//     }
  
//     subscribe(event, callback) {
//       if (!this.listeners[event]) this.listeners[event] = [];
//       this.listeners[event].push(callback);
  
//       return {
//         unsubscribe: () => {
//           this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
//         },
//       };
//     }
  
//     publish(event, payload) {
//       if (!this.listeners[event]) return;
//       for (const callback of this.listeners[event]) {
//         callback(payload);
//       }
//     }
  
//     asyncIterator(event) {
//       const listeners = [];
//       const queue = [];
  
//       const pushValue = (val) => {
//         queue.push(val);
//         for (const resolve of listeners.splice(0)) {
//           resolve({ value: queue.shift(), done: false });
//         }
//       };
  
//       const pullValue = () =>
//         new Promise((resolve) => {
//           if (queue.length) {
//             resolve({ value: queue.shift(), done: false });
//           } else {
//             listeners.push(resolve);
//           }
//         });
  
//       const subscription = this.subscribe(event, pushValue);
  
//       return {
//         next: pullValue,
//         return: async () => {
//           subscription.unsubscribe();
//           return { value: undefined, done: true };
//         },
//         throw: async (error) => {
//           subscription.unsubscribe();
//           throw error;
//         },
//         [Symbol.asyncIterator]() {
//           return this;
//         },
//       };
//     }
//   }
  

// // eventBus.js
// import { EventEmitter } from 'events';

// export class ChatBus extends EventEmitter {
//     asyncIterator(eventName) {
//       const pullQueue = [];
//       const pushQueue = [];
//       let listening = true;
  
//       const eventEmitter = this; // ✅ capture this
  
//       const pushValue = (event) => {
//         if (pullQueue.length !== 0) {
//           pullQueue.shift()({ value: event, done: false });
//         } else {
//           pushQueue.push(event);
//         }
//       };
  
//       const pullValue = () =>
//         new Promise((resolve) => {
//           if (pushQueue.length !== 0) {
//             return resolve({ value: pushQueue.shift(), done: false });
//           }
  
//           pullQueue.push(resolve);
//         });
  
//       const listener = (event) => {
//         if (listening) pushValue(event);
//       };
  
//       eventEmitter.addListener(eventName, listener); // ✅ use captured this
  
//       return {
//         next() {
//           return listening ? pullValue() : this.return();
//         },
//         return() {
//           listening = false;
//           eventEmitter.removeListener(eventName, listener); // ✅ use captured this
//           return Promise.resolve({ value: undefined, done: true });
//         },
//         throw(error) {
//           listening = false;
//           eventEmitter.removeListener(eventName, listener); // ✅ use captured this
//           return Promise.reject(error);
//         },
//         [Symbol.asyncIterator]() {
//           return this;
//         },
//       };
//     }
//   }
import { EventEmitter } from 'events';
export class ChatBus extends EventEmitter {
    asyncIterator(eventName) {
      const ee = this;
      const pullQueue = [];
      const pushQueue = [];
      let listening = true;
  
      const pushValue = (event) => {
        if (pullQueue.length) {
          pullQueue.shift()({ value: event, done: false });
        } else {
          pushQueue.push(event);
        }
      };
  
      const pullValue = () =>
        new Promise((resolve) => {
          if (pushQueue.length) {
            resolve({ value: pushQueue.shift(), done: false });
          } else {
            pullQueue.push(resolve);
          }
        });
  
      const listener = (event) => {
        if (listening) pushValue(event);
      };
  
      ee.on(eventName, listener);
  
      return {
        next() {
          return listening ? pullValue() : this.return();
        },
        return() {
          listening = false;
          ee.removeListener(eventName, listener);
          return Promise.resolve({ value: undefined, done: true });
        },
        throw(error) {
          listening = false;
          ee.removeListener(eventName, listener);
          return Promise.reject(error);
        },
        [Symbol.asyncIterator]() {
          return this;
        },
      };
    }
  }