import * as React from 'react';
import Layout from '../layout';
import { Redirect } from 'react-router-dom';
import CreateElection from '../components/CreateElection';
import fetchTools from '../utils/fetchTools';


export default class extends React.Component {
	props: any;

	requestCreateElection = (elections: any) => {
		console.log(JSON.stringify(elections));

		fetch(fetchTools.call('election/special', true),
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Token ' + this.props.match.params.token,
			},
			method: 'POST',
			body: JSON.stringify(elections),
		})
		.then((response: any) => {
			return response.json();
		})
		.then((data: any) => {
			console.log('CreateElectionPage (`data`): ' + data);
		});
	};

	render() {
		let token = this.props.match.params.token || '';
		let from = this.props.match.params.from.replace(/\//, '\\');

		if (!token) {
			return <Redirect to="/front"/>
		}

		console.log('CreateElectionPage (`from`): ' + from);
		return (
			<Layout
				title='Vytvořit volby'
				token={token}
				back={from + '\\' + token}
				current={'create-election/' + token}
			>
				<CreateElection
					onSubmit={this.requestCreateElection}
				/>
			</Layout>
		);
	}
}
