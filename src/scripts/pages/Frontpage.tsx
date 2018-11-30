import * as React from "react";
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames'
import Button from "@material-ui/core/es/Button/Button";
import Layout from "../layout";

import DynamicList from '../components/DynamicList';
import date_to_string from '../utils/date_to_string';
import ElectionExpandPanel from '../components/ElectionExpandPanel';

import * as fetchTools from '../utils/fetchTools';


const styles = (theme: any) => ({
	root: {
		width: '80%',
		margin: '50px auto 0'
	}
});


class Frontpage extends React.Component {
	props: any;

	handleShowElectionDetails = (id: any) => {
		console.log('Frontpage: `' + id + '` ::: `' + this.state.token + '`');

		this.setState({ showDetail: true, electionId: id });
	};

	updateStateWithData = (data: any) => {
		if (data === []) {
			this.setState({ empty: true });

		} else {
			this.setState({ empty: false, elections: this.processElections(data) });
		}
	};

	processElections = (elections: any) => {
		let a = elections.map((election: any, i: any) => {
			//alert(Date.parse(election.date_start) <= Date.now() && Date.now() <= Date.parse(election.date_end) ? 'progress' : null);
			return (<ElectionExpandPanel
				key={election.id}
				electionId={election.id.toString()}
				electionStart={date_to_string(election.date_start)}
				electionEnd={date_to_string(election.date_end)}

				callback={this.handleShowElectionDetails}

				student={ election.is_student}
				progress={ Date.parse(election.date_start) <= Date.now() && Date.now() <= Date.parse(election.date_end) }
			/>);
		});

		return a;
	};

	_updateWithDummyData = () => {
		this.updateStateWithData([
			{
				'id': 1,
				'date_start': '2018-01-01T00:00',
				'date_end': '2019-02-02T00:00',
				'is_student': true,
			},
		]);
	};

	fetchData = () => {
		fetch('http://hmmmm.magnusi.tech/api/election',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then(response => response.json())
		.then(data => {
			this.updateStateWithData(data);
		}).catch((e: any) => {
			//this._updateWithDummyData();
			// TODO: Error
		});
	};

	checkTokenValid = () => {
		let t = this.props.match.params.token;
		let invalid = t === '###invalid';

		console.log('Frontpage (`checkToken`): ' + (t === '###invalid').toString());

		this.state.invalidToken = invalid;
		this.state.token = !invalid && t ? t : '';

		return !invalid;

		// if (t === '###invalid') {
		// 	this.state.invalidToken = true;
		// 	this.state.token = '';
		//
		// 	return false;
		//
		// } else {
		// 	this.state.invalidToken = false;
		// 	this.state.token = t || '';
		//
		// 	return true;
		// }
	};

	state = {
		elections: [] as Element[],
		empty: true,
		showDetail: false,
		invalidToken: false,
		electionId: '',
		token: ''
	};

	constructor(props: any) {
		super(props);

		this.state = {
			elections: [] as Element[],
			empty: true,
			showDetail: false,
			invalidToken: false,
			electionId: '',
			token: (this.props.match.params.token || ''),
		};

		// console.log(this.props.match.params.token);

		this.handleShowElectionDetails = this.handleShowElectionDetails.bind(this);
		this.checkTokenValid = this.checkTokenValid.bind(this);
		this.fetchData();
	}

	render() {
		const classes = this.props.classes;

		if (this.state.showDetail) {
			if (this.state.token) {
				return (
					<Redirect to={'/detail/' + this.state.electionId + '/' + this.state.token}/>
				);
			}

			return (
				<Redirect to={'/detail/' + this.state.electionId}/>
			);
		}

		return (
			<Layout
				title="Přehled"
				desc={this.checkTokenValid() ? '' : 'Neplatný administrátorský token'}
				token={this.state.token}
				current={'front'}
				back=""
			>
				<div className={classes.root}>
					{this.state.elections}
				</div>
			</Layout>
		);
	}
}


export default withStyles(styles)(Frontpage);
