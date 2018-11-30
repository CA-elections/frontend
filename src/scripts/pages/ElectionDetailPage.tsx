import * as React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Layout from '../layout';
import DynamicList from '../components/DynamicList';
import date_to_string from '../utils/date_to_string';
import CandidateDetail from '../components/CandidateDetail';

import fetchTools from '../utils/fetchTools';


export default class extends React.Component {
	props: any;

	state = {
		electionStart: '',
		electionEnd: '',

		admin: false,
		invalidToken: false,

		isStudent: false,
		token: '',

		candidates: [] as object[]
	};

	updateStateWithData = (data: any) => {
		if (data.detail) {
			this.setState({
				invalidToken: true,
			});
		}

		let start = date_to_string(data.date_start);
		let end = date_to_string(data.date_end);

		console.log('ElectionDetailPage (`update`): ' + JSON.stringify(data));

		this.setState({
			electionStart: start,
			electionEnd: end,

			admin: false,

			candidates: this.processCandidates(data.candidates),

			isStudent: data.is_student
		});
	};

	updateStateWithAdminData = (data: any) => {
		if (data.detail) {
			this.setState({
				invalidToken: true,
			});
		}

		let start = date_to_string(data.date_start);
		let end = date_to_string(data.date_end);

		console.log('ElectionDetailPage (`updateAdmin`): ' + JSON.stringify(data));

		this.setState({
			electionStart: start,
			electionEnd: end,

			admin: true,

			candidates: this.processCandidatesAdmin(data.candidates),

			isStudent: data.is_student
		});
	};

	processCandidates = (candidates: any) => {
		let a = candidates.map((x: any, i: any) => {
			return <CandidateDetail
				{ ...this.state.isStudent && 'student' }

				name={x.name + ' ' + x.surname}
				annotation={x.annotation}

				percent={Math.round(x.percentage * 100)}
				key={i}
			/>;
		});

		return a;
	};

	processCandidatesAdmin = (candidates: any) => {
		let total = 0;

		for (let x of candidates) {
			total += x.votes;
		}

		console.log('ElectionDetailPage (`processAdmin`): ' + JSON.stringify(candidates));
		console.log('ElectionDetailPage (`total`): ' + total.toString());

		let a = candidates.map((x: any, i: any) => {
			return <CandidateDetail
				admin
				{ ...this.state.isStudent && 'student' }

				name={x.name + ' ' + x.surname}
				annotation={x.annotation}

				votes={x.votes}
				percent={Math.round(100 * x.votes / total)}
				key={i}
			/>;
		});

		return a;
	};

	// _updateWithDummyData = () => {
	// 	this.updateStateWithData({
	// 		date_start: '2001-01-01T00:00',
	// 		date_end: '2002-02-02T00:00',
	// 		is_student: true,
			// candidates: [
			// 	{
			// 		id: 1,
			// 		name: 'Foo',
			// 		surname: 'FooS',
			// 		annotation: 'Blah blah blah',
			// 		votes: 15
			// 	},
			// 	{
			// 		id: 2,
			// 		name: 'Bar',
			// 		surname: 'BarS',
			// 		annotation: 'Blah blah blah',
			// 		votes: 32
			// 	},
			// 	{
			// 		id: 3,
			// 		name: 'Baz',
			// 		surname: 'BazS',
			// 		annotation: 'Blah blah blah',
			// 		votes: 51
			// 	},
			// 	{
			// 		id: 4,
			// 		name: 'Qux',
			// 		surname: 'QuxS',
			// 		annotation: 'Blah blah blah',
			// 		votes: 16
			// 	},
			// 	{
			// 		id: 5,
			// 		name: 'Pox',
			// 		surname: 'PoxS',
			// 		annotation: 'Blah blah blah',
			// 		votes: 43
			// 	},
			// ]
	// 	});
	// };

	fetchData = () => {
		this.state.token = this.props.match.params.token;
		let token = this.state.token;

		if (token) {
			fetch(fetchTools.call('election', true)
				+ this.props.match.params.id,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Token ' + token,
					},
				}
			)
			.then(response => response.json())
			.then(data => {
				this.updateStateWithAdminData(data);
			}).catch((e: any) => {
				// TODO: Error
			});

		} else {
			fetch(fetchTools.call('election', false)
				+ this.props.match.params.id,
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
				// TODO: Error
			});
		}
	};

	constructor(props: any) {
		super(props);

		this.updateStateWithData = this.updateStateWithData.bind(this);
		this.processCandidates = this.processCandidates.bind(this);
		this.processCandidatesAdmin = this.processCandidatesAdmin.bind(this);
		//this._updateWithDummyData = this._updateWithDummyData.bind(this);

		this.state = {
			electionStart: '',
			electionEnd: '',
			token: '',

			admin: false,
			invalidToken: false,

			isStudent: false,

			candidates: [] as object[]
		};

		this.fetchData();
	}

	render() {
		if (this.state.invalidToken) {
			return (
				<Redirect to="/front/###invalid"/>
			);
		}

		let token = this.props.match.params.token || '';
		let id = this.props.match.params.id;

		console.log('ElectionDetailPage (`token`): ' + token);
		console.log('ElectionDetailPage (`id`): ' + id);

		return (
			<Layout
				title={'Detail voleb' + (this.state.admin ? ' - Administrátor' : '')}
				token={token || ''}
				back={'front' + (token ? '/' + token : '')}
				current={'detail/' + id + (token ? '/' + token : '')}
			>
				<div className="layout-grid-content">
					<DynamicList
						detail
						electionStart={this.state.electionStart}
						electionEnd={this.state.electionEnd}
						children={this.state.candidates}
					/>
				</div>
			</Layout>
		);
	}
}
