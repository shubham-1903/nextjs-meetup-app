import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUP = [
// 	{
// 		id: "m1",
// 		title: "A first meetups",
// 		image:
// 			"https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
// 		address: "sigapour",
// 		description: "This is first meetups",
// 	},
// 	{
// 		id: "m2",
// 		title: "A second meetups",
// 		image:
// 			"https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
// 		address: "las vagas",
// 		description: "This is first meetups",
// 	},
// ];

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Shubham Meetup</title>
				<meta
					name='description'
					content='Browse a huge list of active react meetup'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};
// export async function getServerSideProps(context) {
// 	// const req = context.req;
// 	// const res = context.res;
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUP,
// 		},
// 	};
// }
export async function getStaticProps() {
	const client = await MongoClient.connect(
		"mongodb://shubhamkr:7xk4leHWUNbtdeUX@firstapp-shard-00-00.1jtgl.mongodb.net:27017,firstapp-shard-00-01.1jtgl.mongodb.net:27017,firstapp-shard-00-02.1jtgl.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-12ta7b-shard-0&authSource=admin&retryWrites=true&w=majority"
	);

	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();
	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
