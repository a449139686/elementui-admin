
//var wsServer = 'ws://172.28.128.5:9502';

var wsServer = 'ws://118.89.159.190:9502';

global.websocket = new WebSocket(wsServer);

websocket.connectCallback = function(){

}

websocket.closeCallback = function(){

}

websocket.onopen = function(evt) {
    websocket.connectCallback(evt.data);
};

websocket.onclose = function(evt) {
    websocket.closeCallback(evt);
};

websocket.onmessage = function(evt) {
    websocket.messageCallback(JSON.parse(evt.data));
};

websocket.onerror = function(evt, e) {
    console.log('Error occured: ' + evt.data);
};
