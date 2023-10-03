module.exports = function(RED) {
  function AndNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.lastSend = null;

    this.on('input', function(msg) {
      var current = config.current;
      var id = msg.payload.id;
      var value = msg.payload.value;

      if (value === '') {
        delete current[id];
      } else {
        current[id] = value;
      }
      
      var result = true;
      for (let key in current) {
        var value = current[key];
        result = (result && value);
      }

      config.current = current;
      if (result !== node.lastSend){
        node.lastSend = result;
        msg.payload = { id: config.id, value: result};
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("and-node", AndNode);
}
