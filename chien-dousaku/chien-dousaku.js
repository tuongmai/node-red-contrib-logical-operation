module.exports = function(RED) {
  function ChiendousakuNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.msgList = 0;
    
    this.on('input', function(msg) {
      var waitTime = config.waitTime;
      var payload = msg.payload;
      var value = payload.value;

      msg = { payload: { id: config.id, value: value } };
      
      if (value) {
        node.msgList++;
        node.status({ fill:"blue", shape:"dot", text: `${node.msgList} delay` });
        setTimeout(() => {
          node.msgList--;
          node.status({ fill:"blue", shape:"dot", text: `${node.msgList} delay` });
          node.send(msg);
        }, waitTime * 1000);
      } else {
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("chien-dousaku", ChiendousakuNode);
}
