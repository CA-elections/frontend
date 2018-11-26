import * as React from "react";
import * as ReactDOM from "react-dom";

import Navigation from "./parts/Navigation";
import AdminLogin from "./parts/AdminLogin";

ReactDOM.render(
	<Navigation/>,
	<AdminLogin/>,
	document.getElementById("example")
);
