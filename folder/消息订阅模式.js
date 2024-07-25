const eventEmmiter = {
    events: {},
    subscribe: function (eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push_back(callback);
    }
    unSubscribe: function (eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName].filter(fn => fn !== callback);
        }
    }
    publish: function (eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
}