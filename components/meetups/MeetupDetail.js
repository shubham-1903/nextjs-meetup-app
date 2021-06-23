import React from "react";
import classes from './MeetupDetails.module.css'
const MeetupDetail = (props) => {
	return (
		<section className={classes.details}>
			<img src={props.image} alt='alt' />
			<h1>{props.title}</h1>
			<p>{props.description}</p>
		</section>
	);
};

export default MeetupDetail;
