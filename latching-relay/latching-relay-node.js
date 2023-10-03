module.exports = function(RED) {
  function LatchingRelayNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.lastSend = null;

    function nor(ele1, ele2) {
      return !(ele1 || ele2);
    }
    
    this.on('input', function(msg) {
      var current = config.current;
      var payload = msg.payload;
      var value = payload.value;
      var q = config.q;
      var notQ = config.notQ;
      
      if (payload.id === config.set) {
        current.set = value;
      } else if (payload.id === config.reset) {
        current.reset = value;
      }
      
      if (current.set || current.reset){
        q = nor(current.reset, nor(q, current.set));
        notQ = nor(current.set, nor(notQ, current.reset));
        config.q = q;
        config.notQ = notQ;
      }
      var msgOut = [
        { payload: { id: config.id, value: q} },
        { payload: { id: config.id, value: notQ} },
      ];
      if (JSON.stringify(msgOut) != JSON.stringify(node.lastSend)) {
        node.lastSend = msgOut;
        node.send(msgOut);
      }
    });
  }
  RED.nodes.registerType("latching-relay", LatchingRelayNode);
}
