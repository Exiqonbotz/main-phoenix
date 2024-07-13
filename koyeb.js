const forever = require("forever-monitor");
const boot = new forever.Monitor("server.js", {
  silent: false,
});
boot.start();
