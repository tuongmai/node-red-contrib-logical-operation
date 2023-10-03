module.exports = function(RED) {
  function WipeoutNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.lastSend = null;

    this.on('input', function(msg) {
      var current = config.current;
      var payload = msg.payload;
      var value = payload.value;

      if (payload.id === config.conditionC) {
        current.conditionC = value;
      } 
      if (payload.id === config.conditionA) {
        current.conditionA = value;
      }

      var result = current.conditionA && !current.conditionC;
      if (result !== node.lastSend) {
        node.lastSend = result;
        msg.payload = { id: config.id, value: result};
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("wipeout", WipeoutNode);
}
