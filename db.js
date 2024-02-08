/** Database setup for BizTime. */

const { Client } = require("pg");

const connectionString = 'postgresql://ian_mcmahon:test@localhost:5432/biztime';

// Create a new client instance
const client = new Client({
    connectionString: connectionString,
});

client.connect();


module.exports = client;