const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config(
    {
        path: "./Config/config.env",
    }
)
const URI = process.env.MONGODB_URI;
const MONGO_HOST = process.env.MONGODB_HOST;
const MONGO_PORT = process.env.MONGODB_PORT;
const DB = process.env.DB_COMPASS;
const MONGO_URI = `${DB}://${MONGO_HOST}:${MONGO_PORT}`;
const client = new MongoClient(MONGO_URI);

const connectDB = async () => {
    try {
        const database = client.db("database_name3");
        const collection = database.collection("collection_name3");
        const documents = [
            { name: "cake", healthy: false },
            { name: "lettuce", healthy: true },
            { name: "donut", healthy: false },
            { name: "peanuts", healthy: true },
            { name: "gurce", healthy: false },
            { name: "junk foods", healthy: false, rating: 4 },
            { name: "apples", healthy: true, rating: "5 star" }
        ];
        const options = { ordered: true };
        const result = await collection.insertMany(documents, options);
        console.log(`${result.insertedCount} documents were inserted successfully!`)
    } catch (error) {
        console.log(`An error occured ${error}`);
    }
    finally {
        await client.close();
    }
}
connectDB();