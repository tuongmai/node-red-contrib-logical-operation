module.exports = function(RED) {
  function NotNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.lastSend = null;

    this.on('input', function(msg) {
      var value = !msg.payload.value;
      
      if (value !== node.lastSend){
        node.lastSend = value;
        msg.payload = { id: config.id, value: value};
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("not-node", NotNode);
}
