
//var wsServer = 'ws://39.108.134.88:9502';

//var wsServer = 'ws://172.28.128.5:9502';

var wsServer = 'wss://blog.fastgoo.net/wss';

global.websocket = new WebSocket(wsServer);

websocket.connectCallback = function(){
    setInterval(function(){
      VueEvent.wsSend({type:'ping'});
    },30000);
}

websocket.closeCallback = function(){

}

websocket.messageCallback = function(){

}

websocket.onopen = function(evt) {
  console.log('连接websocket服务器成功:'+evt.data);
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
