/**
 * Created by ericjohnson on 11/19/15.
 */
import {EventAggregator} from 'aurelia-event-aggregator';
import {Storage} from 'Showpitch/storage';
export class PostBox {
  constructor() {
    this.eventAggregator = new EventAggregator();
    this.storage = new Storage();
  }

  subscribe(topic, callback, getLatestValue = false) {
    // if 'getLatestValue' call callback with latest value
    if (getLatestValue) {
      callback(this.storage.retrieve(topic));
    }
    // subscribe to topic and return unsubscribe option
    return this.eventAggregator.subscribe(topic, payload => {
      callback(payload);
    });
  }

  publish(topic, value, session = true, expiration = undefined) {
    let skipStorage = topic.startsWith('temp');
    let useSession = session && !topic.startsWith('local');
    if (!skipStorage) {
      // store latest value in library
      this.storage.store(topic, value, useSession, expiration);
    }
    // publish topic
    return this.eventAggregator.publish(topic, value);
  }

  clear(topic) {
    // publish the empty value
    this.eventAggregator.publish(topic, undefined);
    // delete topic from library
    this.storage.remove(topic);
  }
}
