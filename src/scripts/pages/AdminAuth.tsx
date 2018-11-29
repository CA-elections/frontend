import * as React from "react";
import AdminLogin from "../components/AdminLogin";
import Layout from "../layout";

import Grid from '@material-ui/core/Grid';


export default class extends React.Component {
	state = {
		fetchInProgress: true,
		errorMsg: '',
		token: '',
	};

	handleSubmitPassword = (password: string) => {
		let token = '';

		fetch('http://127.0.0.1:8000/api/token-auth/',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				method: 'POST',
				body: JSON.stringify({ username: 'admin', password: password })
			}
		)
			.then(response => response.json())
			.then(data => {
				alert(data);
				if (data.token) {
					this.setState({ token: data.token, fetchInProgress: false });

				} else {
					this.setState({ errorMsg: 'Neplatné heslo', fetchInProgress: false });
				}
			})
			.catch(() => {
				this.setState({ errorMsg: 'Chyba při komunikaci se serverem', fetchInProgress: false });
			});
	}

	render() {
		return (
			<Layout>
	      <Grid
	        container
	        spacing={24}
	        direction="column"
	        alignContent="center"
	        alignItems="center"
	        justify="center"

	        className="layout-grid-content"
	      >
					<AdminLogin
						token={this.state.token}
						errorMsg={this.state.errorMsg}
						onSubmit={this.handleSubmitPassword}
					/>
				</Grid>
			</Layout>
		);
	}
}
