import Head from "next/head";

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetupPage = () => {
	const router = useRouter();
	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data + " data on frontend");
		router.push("/");
	}
	return (
		<>
			<Head>
				<title>Add Meetup</title>
				<meta
					name='description'
					content='Add your own meetup to your meetup'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetupPage;
