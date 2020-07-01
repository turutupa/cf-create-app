const fs = require('fs');
const path = require('path');

function createDefaultSchema() {
  try {
    const defaultSchemaDirectory = path.normalize(
      this.scriptPath + '/db/schema.cds'
    );
    const defaultSchema = fs.readFileSync(defaultSchemaDirectory, 'utf8');
    const newDefaultSchemaDirectory = path.normalize(
      this.targetPath + '/db/schema.cds'
    );
    fs.writeFileSync(newDefaultSchemaDirectory, defaultSchema);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createDefaultSchema;
