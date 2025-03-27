const https = require('https');
const figlet = require('figlet');

const repo = 'efebagri/discordjs-base-handler';
const currentVersion = require('../package.json').version; // current version of your code
const options = {
    headers: {'User-Agent': 'Mozilla/5.0'}, // GitHub requires a User-Agent
};

// Checks if there is an update for the repository
function checkForUpdates() {
    figlet('RubiCord', function (err, data) {
        if (err) {
            console.log('Error when creating ASCII Art:', err);
            return;
        }
        console.log(data);
    });

    https.get(`https://api.github.com/repos/${repo}/releases/latest`, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const latestVersion = JSON.parse(data).tag_name;

            if (latestVersion !== currentVersion) {
                console.log(`There is an update available (${latestVersion}). Your current version: ${process.env.APP_VERSION}`);
            } else {
                console.log(`You are up to date (${process.env.APP_VERSION})`);
            }
        });
    }).on('error', (err) => {
        console.error(`Error retrieving GitHub information: ${err.message}`);
    });
}

// Call the check function when the client starts
console.log('—————————————————[ RUBICON ]—————————————————');
checkForUpdates();
