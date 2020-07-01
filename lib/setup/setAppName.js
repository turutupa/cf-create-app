const prompts = require('prompts');

async function setAppName() {
  try {
    const appName = await prompts({
      type: 'text',
      name: 'name',
      message: 'Set an app name (app name must have at least 3 characters)',
      validate: (value) =>
        value.length < 3
          ? 'Please set a name with at least 3 characters'
          : true,
    });
    return appName.name;
  } catch (e) {
    console.error('You need to set an app name to continue with setup');
    return false;
  }
}

module.exports = setAppName;
