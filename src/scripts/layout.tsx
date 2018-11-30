import * as React from "react";
import Navigation from "./components/Navigation";


export default function(props: any) {
	let back = props.back ? props.back.replace(/\//, '\\') : '';
	let current = props.current ? props.current.replace(/\//, '\\') : '';

	console.log('Layout (`back`): ' + props.back);
	console.log('Layout (`current`): ' + props.current);
	console.log('Layout (`token`): ' + props.token);

	return (
		<div>
			<Navigation
				back={back}
				current={current}
				token={props.token}
				thisIsCreateElections={props.thisIsCreateElections}
			/>

			<div className="layout-wrapper">
				<h1 className="layout-title">{props.title}</h1>
				<h1 className="layout-desc">{props.desc}</h1>
			</div>

			{props.children}
		</div>
	);
}
