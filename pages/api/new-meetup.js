//POST /api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
	try {
		if (req.method === "POST") {
			const data = req.body;

			// const { title, image, address, description } = data;
			// mongodb+srv://shubhamkr:7xk4leHWUNbtdeUX@firstapp.1jtgl.mongodb.net/meetups?retryWrites=true&w=majority&ssl=true
			const client = await MongoClient.connect(
				"mongodb://shubhamkr:7xk4leHWUNbtdeUX@firstapp-shard-00-00.1jtgl.mongodb.net:27017,firstapp-shard-00-01.1jtgl.mongodb.net:27017,firstapp-shard-00-02.1jtgl.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-12ta7b-shard-0&authSource=admin&retryWrites=true&w=majority",
				{ useNewUrlParser: true, useUnifiedTopology: true }
			);

			const db = client.db();

			const meetupsCollection = db.collection("meetups");
			const result = await meetupsCollection.insertOne(data);
			console.log(result.ops);
			client.close();
			res.status(201).json({ message: "Meetup inserted!" });
		}
	} catch (err) {
		console.log(err + "🍘");
	}
	process.on("unhandledRejection", (err) => {
		console.log(`Send this error to tracking:${err.stack}`);
		console.log("----------------------------------------");
	});
}

export default handler;
