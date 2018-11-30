import * as React from "react";
import AdminLogin from "../components/AdminLogin";
import Layout from "../layout";

import Grid from '@material-ui/core/Grid';


const admin_username = 'user';

export default class extends React.Component {
	state = {
		fetchInProgress: true,
		errorMsg: '',
		token: '',
	};
	props: any;

	handleSubmitPassword = (password: string) => {
		let token = '';

		fetch('http://hmmmm.magnusi.tech/api/token-auth/',
			{
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ username: admin_username, password: password })
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
		let from = this.props.match.params.from;

		console.log('AdminAuth (`from`): ' + from);

		return (
			<Layout
				back={from}
				token="###---###"
				title="Přihlásit se"
				desc="Zadejte údaje administrátora"
			>
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
						from={from}
						errorMsg={this.state.errorMsg}
						onSubmit={this.handleSubmitPassword}
					/>
				</Grid>
			</Layout>
		);
	}
}
