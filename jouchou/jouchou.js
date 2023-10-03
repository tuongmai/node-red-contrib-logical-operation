module.exports = function(RED) {
  function JouchouNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.lastSend = null;
    
    this.on('input', function(msg) {
      var current = config.current;
      var count = config.count;
      var payload = msg.payload;
      var value = payload.value;
      
      if (typeof current[payload.id] != 'boolean'){
        current[payload.id] = value;
        count = 0;
        for (let key of Object.keys(current)) {
          (current[key] === true) && count++;
        }
        config.count = count;
      }
      else if ((typeof value == 'boolean') && (value !== current[payload.id])) {
        current[payload.id] = value;
        value ? count++ : count--;
        config.count = count;
      }
      else if ((value === '') && current[payload.id]) {
        current[payload.id] = false;
        config.count = config.count - 1;
      }

      var result = (config.count >= config.minimumCondition);
      if (result !== node.lastSend){
        node.lastSend = result;
        msg.payload = { id: config.id, value: result };
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("jouchou", JouchouNode);
}
