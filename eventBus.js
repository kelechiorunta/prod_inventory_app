// eventBus.js
import { EventEmitter } from 'events';
import { ChatBus } from './ChatBus.js';
import { PubSub } from 'graphql-subscriptions';
export const chatBus = new ChatBus();
export const EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  TYPING: 'TYPING',
  NEW_GROUP_MESSAGE: 'NEW_GROUP_MESSAGE',
  GROUP_TYPING_INDICATOR: 'GROUP_TYPING_INDICATOR'
  };
const eventBus = new EventEmitter();
export default eventBus;
