const fs = require('fs');

module.exports = function write(data, directory) {
  try {
    if (directory) fs.writeFileSync(directory, data);
    else fs.writeFileSync('./mta.yaml', data);
    return true;
  } catch (e) {
    return false;
  }
};
