module.exports = function(RED) {
  function ChangeSwitch(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var switchList = config.switch;
    var index = config.current;
    var value = switchList[index];
    node.status({ fill: "yellow", shape: "dot", text: value });

    function sendMessageOnClose() {
      var msg = {
        payload: {
          id: config.id,
          value: ''
        }
      };
      node.send(msg);
    }

    this.change = function(){
      var switchNumber = switchList.length;
      var index = (config.current + 1) % switchNumber;
      config.current = index;
      var value = switchList[index];
      node.status({ fill: "yellow", shape: "dot", text: value });
      var msg = [];
      for (var i = 0; i < switchList.length; i++) {
        msg.push({
          payload: { id: config.id, value: (i == index) ? true : false }
        })
      }
      node.send(msg);
    };

    this.on('close', function(removed, done) {
      if (removed) {
        sendMessageOnClose();
      } else {
        var index = config.current;
        var value = config.switch[index];
        var msg = {
          payload: {
            id: config.id,
            value: value
          }
        };
        node.send(msg);
      }
      done();
    })
  }

  RED.nodes.registerType("change-switch", ChangeSwitch);

  RED.httpAdmin.post("/change-switch/:id", function (req, res) {
    var node = RED.nodes.getNode(req.params.id);
    if (node != null) {
      try {
        node.change()
        res.sendStatus(200);
      } catch(err) {
        res.sendStatus(500);
        node.error(RED._("inject.failed",{error:err.toString()}));
      }
    } else {
      res.sendStatus(404);
    }
  })
}
