import * as React from "react";
import Navigation from "./components/Navigation";


export default function(props: any) {
	return (
		<div>
			<Navigation back={props.back}/>
			<div className="layout-wrapper">
				<h1 className="layout-title">{props.title}</h1>
				<h1 className="layout-desc">{props.desc}</h1>
			</div>
			{props.children}
		</div>
	);
}
