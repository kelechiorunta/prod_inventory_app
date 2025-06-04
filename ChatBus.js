
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