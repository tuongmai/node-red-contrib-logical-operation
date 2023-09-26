module.exports = function(RED) {
  function Kioku1Node(config) {
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
      var a = current.conditionA;
      var b = current.outputB;
      var c = current.conditionC;
      var output = ((a || b) && (!c));
      current.outputB = output;
      msg.payload = { id: config.id, value: output }
      
      node.send(msg);
    });
  }
  RED.nodes.registerType("kioku-1", Kioku1Node);
}
