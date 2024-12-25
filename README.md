# PriorityMatrix
PriorityMatrix is an Angular application designed to help you manage and prioritize tasks efficiently.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Development Server](#development-server)
    - [Code Scaffolding](#code-scaffolding)
    - [Build](#build)
    - [Running Unit Tests](#running-unit-tests)
    - [Running End-to-End Tests](#running-end-to-end-tests)
- [Additional Resources](#additional-resources)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli) version 18.1.1 or later installed.

## Getting Started

### Development Server API
1. Run `node server/server.js`
2. Uncomment the task.services.ts api url to local url (Usually 5001 by default)

### Development Server UI

1. Run `ng serve` to start the development server.
2. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code Scaffolding

Generate new components, directives, pipes, services, and more with the following command:
```sh
ng generate component|directive|pipe|service|class|guard|interface|enum|module <name>
```

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

Execute unit tests via [Karma](https://karma-runner.github.io) with:
```sh
ng test
```

### Running End-to-End Tests

Execute end-to-end tests with:
```sh
ng e2e
```
Note: You need to add a package that implements end-to-end testing capabilities before running this command.

## Additional Resources

For more information on the Angular CLI, use:
```sh
ng help
```
or visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is licensed.

## Todo items and Bugs
P1
-------
1. ~~Bug: Unable to save new data~~ False Positive, Related to #6
2. ~~Bug: Reload is breaking the page~~
3. ~~Bug: Objects are movable in mobile view which is not user friendly~~
4. ~~Bug: Initally Loaded Data is getting hidden in Priority menu for Mobile View~~ False Positive, Related to #6
5. Improvement: Add ability to switch between list Mode and Matrix mode easily in mobile view
6. Figure out a way to keep render service alive which get's down after inactivity and takes 50secs to start
7. ~~Bug: After clicking on Add Task with correctly filled form, it shows a Please fill in all required fields message but eventually saves the data~~
8. ~~Bug: Delete button on the list of input-task list doensn't do anything~~
9. ~~Improvement: Sort the input-task list by latest at top~~

P2
-----
1. Add logo, favicons
2. Add SEO
3. Attach to Domain
4. Do marketing
5. Remember User Choice on theme
6. Cookies management
7. Improve the dark theme

P3
---------
1. Add backlinks to both the web apps
2. Add in ProductHunt and IndieHackers

## Contributing

Contributions are welcome! Please do not commit directly to master branch and always wait for PR approvals.
