declare module 'postbox' {
  
  /**
   * Created by ericjohnson on 11/19/15.
   */
  import { EventAggregator }  from 'aurelia-event-aggregator';
  import { Storage }  from 'storage';
  export class PostBox {
    constructor();
    subscribe(topic: any, callback: any, getLatestValue?: any): any;
    publish(topic: any, value: any, session?: any, expiration?: any): any;
    clear(topic: any): any;
  }
}