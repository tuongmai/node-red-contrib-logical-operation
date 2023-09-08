module.exports = function(RED) {
  function NotNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.on('input', function(msg) {
      var value = msg.payload.value;
      
      msg.payload = { id: config.id, value: !value};

      node.send(msg);
    });
  }
  RED.nodes.registerType("not-node", NotNode);
}
