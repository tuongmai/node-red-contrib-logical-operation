module.exports = function(RED) {
  function WipeoutNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

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
      msg.payload = { id: config.id, value: current.conditionA && !current.conditionC};

      node.send(msg);
    });
  }
  RED.nodes.registerType("wipeout", WipeoutNode);
}
