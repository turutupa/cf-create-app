const prompts = require('prompts');

const REACT = 'react';
const ANGULAR = 'angular';
const VUE = 'vue';

const selectTemplate = async () => {
  console.log('\n');

  const USER_SPECIFIED_TEMPLATE = 'USER_SPECIFIED_TEMPLATE';

  try {
    let choices = [];

    const typescript = {
      title: 'TypeScript',
      description: 'Official TypeScript template',
      value: 'typescript',
    };
    const ui5WebComponents = {
      title: 'UI5 Web Components',
      description: 'Official UI5 Web Components template',
      value: 'ui5-webcomponents-react-seed',
    };
    const redux = {
      title: 'Redux',
      description: 'Official redux template',
      value: 'redux',
    };

    choices = [typescript, ui5WebComponents, redux];

    choices = [
      ...choices,
      { title: `Specify template manually`, value: USER_SPECIFIED_TEMPLATE },
    ];
    let message = 'Do you want to use a template?';

    const selectedTemplate = await prompts({
      type: 'select',
      name: 'value',
      message,
      choices,
      initial: 0,
    });

    if (selectedTemplate.value === USER_SPECIFIED_TEMPLATE) {
      const userTemplate = await prompts({
        type: 'text',
        name: 'value',
        message: `Specify template`,
        validate: (value) =>
          value.length > 0 ? true : `Please specify a valid template name`,
      });

      return userTemplate.value;
    }

    return selectedTemplate.value;
  } catch (e) {
    console.log(e);
    return await selectTemplate();
  }
};

module.exports = selectTemplate;
