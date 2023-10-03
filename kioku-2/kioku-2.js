module.exports = function(RED) {
  function Kioku2Node(config) {
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
      var a = current.conditionA;
      var b = current.outputB;
      var c = current.conditionC;
      var output = (a || (b && (!c)));
      current.outputB = output;

      if (output !== node.lastSend) {
        node.lastSend = output;
        msg.payload = { id: config.id, value: output };
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("kioku-2", Kioku2Node);
}
