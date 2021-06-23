import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props) {
	console.log(props);
	return (
		<>
			<Head>
				<title>{props.meetupsData.title}</title>
				<meta name='description' content='Meetup details' />
			</Head>
			<MeetupDetail
				image={props.meetupsData.image}
				title={props.meetupsData.title}
				description={props.meetupsData.description}
				address={props.meetupsData.address}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb://shubhamkr:7xk4leHWUNbtdeUX@firstapp-shard-00-00.1jtgl.mongodb.net:27017,firstapp-shard-00-01.1jtgl.mongodb.net:27017,firstapp-shard-00-02.1jtgl.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-12ta7b-shard-0&authSource=admin&retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);

	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
	console.log("meetups🍖🥨🥓🍟 " + meetups);
	client.close();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	console.log(meetupId);
	const client = await MongoClient.connect(
		"mongodb://shubhamkr:7xk4leHWUNbtdeUX@firstapp-shard-00-00.1jtgl.mongodb.net:27017,firstapp-shard-00-01.1jtgl.mongodb.net:27017,firstapp-shard-00-02.1jtgl.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-12ta7b-shard-0&authSource=admin&retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);

	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});
	console.log(selectedMeetup.title + "  SelectedMeetup 🥞🍚");

	client.close();
	return {
		props: {
			meetupsData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
				address: selectedMeetup.address,
			},
		},
		revalidate: 1,
	};
}
export default MeetupDetails;
