define(['exports', 'aurelia-event-aggregator', 'aurelia-storage'], function (exports, _aureliaEventAggregator, _aureliaStorage) {
    'use strict';

    exports.__esModule = true;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var PostBox = (function () {
        function PostBox() {
            _classCallCheck(this, PostBox);

            this.eventAggregator = new _aureliaEventAggregator.EventAggregator();
            this.storage = new _aureliaStorage.Storage();
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
            var local = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            var skipStorage = topic.startsWith('temp'),
                isLocal = local || topic.startsWith('local');

            if (!skipStorage) {
                this.storage.store(topic, value, !isLocal);
            }

            return this.eventAggregator.publish(topic, value);
        };

        PostBox.prototype.clear = function clear(topic) {
            this.eventAggregator.publish(topic, undefined);

            this.storage.remove(topic);
        };

        return PostBox;
    })();

    exports.PostBox = PostBox;
});