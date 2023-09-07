module.exports = function(RED) {
  function InputLed(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.change = function(){
      var change = (config.current !== "true");
      config.current = change.toString();
      if (change) {
        node.status({ fill:"green", shape:"dot", text:"ON" });
      } else {
        node.status({ fill:"red", shape:"ring", text:"OFF" });
      }
      var msg = {
        payload: {
          id: config.id,
          change: change
        }
      };
      node.send(msg);
    };
  }

  RED.nodes.registerType("input-led", InputLed);

  RED.httpAdmin.post("/input-led/:id", function (req, res) {
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
