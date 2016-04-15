

import { EventAggregator } from 'aurelia-event-aggregator';
import { Storage } from 'storage';
export let PostBox = class PostBox {
  constructor() {
    this.eventAggregator = new EventAggregator();
    this.storage = new Storage();
  }

  subscribe(topic, callback, getLatestValue = false) {
    if (getLatestValue) {
      callback(this.storage.retrieve(topic));
    }

    return this.eventAggregator.subscribe(topic, payload => {
      callback(payload);
    });
  }

  publish(topic, value, session = true, expiration = undefined) {
    let skipStorage = topic.startsWith('temp');
    let useSession = session && !topic.startsWith('local');
    if (!skipStorage) {
      this.storage.store(topic, value, useSession, expiration);
    }

    return this.eventAggregator.publish(topic, value);
  }

  clear(topic) {
    this.eventAggregator.publish(topic, undefined);

    this.storage.remove(topic);
  }
};