// Import the Client
const client = require("../index");

// Define the available activities
const activities = [
    'with WebStorm',
    'with the Code',
    'with the GitHub Repo',
    'with the Support Tickets',
];

// When the bot is ready, update the activity at regular intervals
client.on("ready", () => {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * activities.length);
        const newActivity = activities[randomIndex];
        client.user.setActivity(newActivity);
    }, 10000); // Update the activity every 10 seconds

    console.log(`Logged in as ${client.user.tag}! v${process.env.APP_VERSION}`);
    console.log('—————————————————[ RUBICON ]—————————————————');
});
