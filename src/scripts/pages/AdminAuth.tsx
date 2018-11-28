import * as React from "react";
import AdminLogin from "../components/AdminLogin";
import Layout from "../layout";


function handleSubmitPassword(password: string) {
	return password === 'foobar';
}

export default function(props: any) {
	return (
		<Layout>
			<AdminLogin
				onSubmit={handleSubmitPassword}
			/>
		</Layout>
	);
}
