module.exports = function(RED) {
  function Kioku3Node(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    function nor(ele1, ele2) {
      return !(ele1 || ele2);
    }
    
    this.on('input', function(msg) {
      var current = config.current;
      var payload = msg.payload;
      var value = payload.value;
      var setYuusen = config.setYuusen;
      var resetYuusen = config.resetYuusen;
      
      if (payload.id === config.set) {
        current.set = value;
      } else if (payload.id === config.reset) {
        current.reset = value;
      }
      
      if (current.set || current.reset){
        resetYuusen = nor(current.reset, nor(resetYuusen, current.set));
        setYuusen = nor(current.set, nor(setYuusen, current.reset));
        config.resetYuusen = resetYuusen;
        config.setYuusen = setYuusen;
      }
      var msgOut = [
        { payload: { id: config.id, value: !setYuusen} },
        { payload: { id: config.id, value: resetYuusen} },
      ];
      node.send(msgOut);
    });
  }
  RED.nodes.registerType("kioku-3", Kioku3Node);
}
