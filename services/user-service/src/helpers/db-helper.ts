import { MongoClient, init } from '../../deps.ts';

// Intialize the plugin
await init();

const client = new MongoClient();
client.connectWithUri('mongodb://localhost:27017');

// Specifying the database name
const dbName: string = 'drill_in';
const db = client.database(dbName);

// Declare the collections here. Here we are using only one collection
const users = db.collection('users');
export { db, users };
