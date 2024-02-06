/** Database setup for BizTime. */

const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///biztime"
  // user?: string | undefined;
  // database?: string | undefined;
  // port: number;
  // host: string;
  // password?: string | undefined;
  // ssl: boolean;
});

client.connect();


module.exports = client;