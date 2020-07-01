const _executeCommand = require('./_executeCommand');
const prompts = require('prompts');

module.exports = async function cfCredentialsCheck() {
  console.log(
    `
      Login is required for the creation of services such as HANA and HTML5 Repo.
      Please make sure you have logged in and pointing to the correct organization 
      & space before running this setup
    `
  );

  await _executeCommand({ command: 'cf target' });

  try {
    const isUserLoggedIn = await prompts({
      type: 'confirm',
      name: 'confirmation',
      message: 'Have you logged in already?',
    });

    if (isUserLoggedIn.confirmation) return true;
    else {
      console.log('Please login via "cf login" and then run setup again');
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
