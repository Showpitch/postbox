System.register(['aurelia-event-aggregator', 'storage'], function (_export) {
  'use strict';

  var EventAggregator, Storage, PostBox;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_storage) {
      Storage = _storage.Storage;
    }],
    execute: function () {
      PostBox = (function () {
        function PostBox() {
          _classCallCheck(this, PostBox);

          this.eventAggregator = new EventAggregator();
          this.storage = new Storage();
        }

        PostBox.prototype.subscribe = function subscribe(topic, callback) {
          var getLatestValue = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

          if (getLatestValue) {
            callback(this.storage.retrieve(topic));
          }

          return this.eventAggregator.subscribe(topic, function (payload) {
            callback(payload);
          });
        };

        PostBox.prototype.publish = function publish(topic, value) {
          var session = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
          var expiration = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

          var skipStorage = topic.startsWith('temp'),
              useSession = session && !topic.startsWith('local');
          if (!skipStorage) {
            this.storage.store(topic, value, useSession, expiration);
          }

          return this.eventAggregator.publish(topic, value);
        };

        PostBox.prototype.clear = function clear(topic) {
          this.eventAggregator.publish(topic, undefined);

          this.storage.remove(topic);
        };

        return PostBox;
      })();

      _export('PostBox', PostBox);
    }
  };
});