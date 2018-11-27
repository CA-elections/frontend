import * as React from "react";
import Navigation from "./components/Navigation";

export default function(props: any) {
	return (<div>
		<Navigation/>
		{props.children}
	</div>);
}
