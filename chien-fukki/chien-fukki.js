module.exports = function(RED) {
  function ChienfukkiNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    
    this.on('input', function(msg) {
      var waitTime = config.waitTime;
      var payload = msg.payload;
      var value = payload.value;

      msg = { payload: { id: config.id, value: value } };
      
      if (!value) {
        for (let i = Math.floor(waitTime); i >= 0; i--) {
          setTimeout(() => {
            node.status({ fill:"blue", shape:"dot", text: `${i}s` });
          }, (waitTime - i) * 1000);
        }
        setTimeout(() => {
          node.send(msg);
        }, waitTime * 1000);
      } else {
        node.status({ fill:"blue", shape:"dot", text: `0s` });
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("chien-fukki", ChienfukkiNode);
}
