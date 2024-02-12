/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:59 AM
 * File: updater.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

const https = require('https');
const figlet = require('figlet');

const repo = 'efebagri/discordjs-base-handler';
const currentVersion = require('../package.json').version; // aktuelle Version Ihres Codes
const options = {
    headers: {'User-Agent': 'Mozilla/5.0'}, // GitHub benötigt einen User-Agent
};

// Überprüft, ob es ein Update für das Repository gibt
function checkForUpdates() {
    figlet('RubiCord', function(err, data) {
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

// Rufen Sie die Überprüfungsfunktion beim Start des Clients auf
console.log('—————————————————[ RUBICON ]—————————————————');
checkForUpdates();
