module.exports = function(RED) {
  function OrNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.on('input', function(msg) {
      var current = config.current;
      var id = msg.payload.id;
      var change = msg.payload.change;

      if (change === '') {
        delete current[id];
      } else {
        current[id] = change;
      }
      
      var result = false;
      for (let key in current) {
        var value = current[key];
        result = (result || value);
      }
      
      result = result.toString();
      msg.payload = result;
      config.current = current;

      node.send(msg);
    });
  }
  RED.nodes.registerType("or-node", OrNode);
}
