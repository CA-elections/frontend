import * as React from "react";
import * as ReactDOM from "react-dom";

import Navigation from "./parts/Navigation";
import AdminLogin from "./parts/AdminLogin";
import LoadingBox from "./parts/LoadingBox";


function handleSubmitPassword(password: string) {
	return password === 'foobar';
}

function reactRenderDOM() {
	ReactDOM.render(
		<div>
			<Navigation/>
			<AdminLogin
				onSubmit={handleSubmitPassword}
			/>
		</div>,
		document.getElementById("example")
	);
}

reactRenderDOM();
