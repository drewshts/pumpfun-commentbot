import createPumpProfiles from './main.js';
import chalk from "chalk";

createPumpProfiles().then(() => {

}).catch(error => {
    console.error(chalk.redBright('An error occurred:', error));
});
