import * as React from "react";
import * as ReactDOM from "react-dom";

import Navigation from "./parts/Navigation";
import AdminLogin from "./parts/AdminLogin";

ReactDOM.render(
	<div>
		<Navigation/>
		<AdminLogin/>
	</div>,
	document.getElementById("example")
);
