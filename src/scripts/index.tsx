import * as React from "react";
import * as ReactDOM from "react-dom";

import Navigation from "./parts/Navigation";
import AdminLogin from "./parts/AdminLogin";

function handleSubmitPassword(password: string) {
	alert(password);
}

ReactDOM.render(
	<div>
		<Navigation/>
		<AdminLogin
			onSubmit={handleSubmitPassword}
		/>
	</div>,
	document.getElementById("example")
);
