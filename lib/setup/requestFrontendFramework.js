const prompts = require('prompts');

const selectFrontend = async () => {
  console.log('\n');
  try {
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Select a front-end framework for your project',
      choices: [
        {
          title: 'React',
          description: 'Templates coming soon',
          value: 'react',
        },
        {
          title: 'Vue',
          description: 'Default @vue/cli create app',
          value: 'vue',
        },
        {
          title: 'Angular',
          description: 'Unleash the power of Angular!',
          value: 'angular',
        },
        {
          title: 'I will import my own frontend framework',
          decription:
            'Select this if you are planning on working with SAPUI5 or any other framework',
          value: false,
        },
      ],
      initial: 0,
    });

    return response.value;
  } catch (e) {
    console.log(e);
    return await selectFrontend();
  }
};

module.exports = selectFrontend;
