import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';


import Routes from "./routes";

console.log(process.env.URL);

ReactDOM.render(
	<HashRouter>
		<Routes/>
	</HashRouter>,
	document.getElementById("example")
);
