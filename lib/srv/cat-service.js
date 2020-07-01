const cds = require("@sap/cds");

module.exports = function () {
  this.on("currentUser", async (req) => {
    const user = req.user;
  });
};
