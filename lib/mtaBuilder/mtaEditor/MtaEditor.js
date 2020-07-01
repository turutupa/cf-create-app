const loadYaml = require('./load');
const writeYaml = require('./write');

// This class is for basic yaml operations
// read, write, mergeAttributes...
class MtaEditor {
  static load = loadYaml;
  static write = writeYaml;
}

module.exports = MtaEditor;
