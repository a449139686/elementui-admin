
//var wsServer = 'ws://172.28.128.5:9502';

//var wsServer = 'wss://118.89.159.190:9502';
//
var wsServer = 'wss://127.0.0.1:9502';

global.websocket = new WebSocket(wsServer);

websocket.connectCallback = function(){

}

websocket.closeCallback = function(){

}

websocket.onopen = function(evt) {
  console.log('连接websocket服务器成功:'.evt.data);
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
