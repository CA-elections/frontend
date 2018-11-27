import * as React from "react";
import * as ReactDOM from "react-dom";

import Navigation from "./components/Navigation";
import Frontpage from "./pages/Frontpage";

ReactDOM.render(
<div>
			<Navigation/>
			<Frontpage/>
		</div>,
	document.getElementById("example")
);
