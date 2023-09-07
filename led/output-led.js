module.exports = function(RED) {
  function OutputLed(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.on('input', function(msg) {
      var input = (msg.payload === "true");
      config.current = input.toString();
      if (input) {
        node.status({ fill:"green", shape:"dot", text:"ON" });
      } else {
        node.status({ fill:"red", shape:"ring", text:"OFF" });
      }
    });
  }
  RED.nodes.registerType("output-led", OutputLed);
}
