module.exports = function(RED) {
  function OutputLed(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.on('input', function(msg) {
      var input = msg.payload.value;
      if (input) {
        node.status({ fill:"green", shape:"dot", text:"ON" });
      } else if (input === '') {
        node.status({ fill:"gray", shape:"dot", text:"UNKNOWN" });
      } else {
        node.status({ fill:"red", shape:"ring", text:"OFF" });
      }
    });
  }
  RED.nodes.registerType("output-led", OutputLed);
}
