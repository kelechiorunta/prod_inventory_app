// eventBus.js
import { EventEmitter } from 'events';
import { ChatBus } from './ChatBus.js';
import { PubSub } from 'graphql-subscriptions';
export const chatBus = new ChatBus();
export const EVENTS = {
    NEW_MESSAGE: 'NEW_MESSAGE',
  };
const eventBus = new EventEmitter();
export default eventBus;
