// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// TODO: Create an array of questions for user input
function readmeQuestions(){
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title?'
    }
    ,
    {
        type: 'input',
        name: 'description',
        message: 'What is the description?'
    }
    ,
    {
        type: 'input',
        name: 'installation',
        message: 'What is the installation instructions?'
    }
    ,
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage information?'
    }
    ,
    {
        type: 'list',
        name: 'license',
        message: 'What is the license you would like to use?',
        choices: ['MIT', 'Apache 2.0', 'IBM', 'ISC', 'null']
    }
    ,
    {
        type: 'input',
        name: 'contributing',
        message: 'What is the contributing guidelines?'
    }
    ,
    {
        type: 'input',
        name: 'tests',
        message: 'What is the tests information?'
    }
    ,
    {
        type: 'input',
        name: 'GitHub',
        message: 'What is your GitHub username?'
    }
    ,
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
    }
]);
}

function makeReadme(answers) {
    let badge = '';
    if (answers.license !== 'null') {
        badge = `![Static badge](https://img.shields.io/badge/license-${encodeURIComponent(answers.license)}-blue)`;
    }

    // Generate the content for the README file using the user's answers
    const readmeContent = `
# ${answers.title}
${badge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For any questions, please contact me via GitHub: [${answers.GitHub}](https://github.com/${answers.GitHub})
or send an email to: ${answers.email}
`;

    return readmeContent;
}

// TODO: Create a function to write README file
function writeREADME(content, callback) {
    fs.writeFile('README.md', content, 'utf8', (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null, 'README.md has been created successfully.');
        }
    });
}

// TODO: Create a function to initialize app
function init() {
    readmeQuestions()
        .then((answers) => {
            const readmeContent = makeReadme(answers);
            writeREADME(readmeContent, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        })
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();