module.exports = function(RED) {
  function OneShotNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    
    this.on('input', function(msg) {
      var expireTime = config.expireTime;
      var payload = msg.payload;
      var value = payload.value;

      msg = { payload: { id: config.id, value: value } };
      
      if (value) {
        node.status({ fill:"green", shape:"dot", text: "ON" });
        node.send(msg);
        setTimeout(() => {
          msg = { payload: { id: config.id, value: false } };
          node.status({ fill:"red", shape:"ring", text: "OFF" });
          node.send(msg);
        }, expireTime * 1000);
      } else {
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("one-shot", OneShotNode);
}
  