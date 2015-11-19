declare module 'aurelia-post-box' {
  
  /**
   * Created by ericjohnson on 11/19/15.
   */
  import { EventAggregator }  from 'aurelia-event-aggregator';
  import { Storage }  from 'aurelia-post-box/storage';
  export class PostBox {
    constructor();
    subscribe(topic: any, callback: any, getLatestValue?: any): any;
    publish(topic: any, value: any, local?: any): any;
    clear(topic: any): any;
  }
}