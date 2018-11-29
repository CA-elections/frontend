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

		fetch('http://hmmmm.magnusi.tech/api/token-auth/',
			{
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ username: 'user', password: password })
			}
		)
			.then(response => response.json())
			.then(data => {
				//alert(JSON.stringify(data));
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
			<Layout back="" token="###---###">
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
