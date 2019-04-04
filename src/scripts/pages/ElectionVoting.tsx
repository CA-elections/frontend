import * as React from "react";
import Layout from "../layout";
import { Redirect } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import fetchTools from "../utils/fetchTools";

interface ElectionVotingProps {
	match: any
}

export default class ElectionVoting extends React.Component<ElectionVotingProps> {
	state = {
		votes_available: 0,
		election_id: 1,
		candidates: Array(),
		name: "",
		desc: "",
		votes: Array(),
		votingConfirm: false,
		back: false,
	};

	constructor(props: ElectionVotingProps) {
		super(props);

		this.fetchCodeData()
		this.addVote = this.addVote.bind(this)
		this.sendVote = this.sendVote.bind(this)
		this.removeVote = this.removeVote.bind(this)
	}

	fetchCodeData() {
		fetch(fetchTools.call('notification/' + this.props.match.params.token, false))
			.then(result => {
				return result.json();
			})
			.then(result => {
				this.setState(result)

				fetch(fetchTools.call('election/' + this.state.election_id, false))
					.then(result => {
						return result.json();
					})
					.then(result => {
						this.setState(result)
						console.log(this.state);
					})
			}).catch((e) => {
				console.log(e)
			})
	}

	addVote(id: number) {
		this.state.votes.push(id)

		this.setState({ votes: this.state.votes } );
		console.log(this.state.votes)
	}

	removeVote(id: number) {
		const result = this.state.votes.filter((x) => x != id);
		console.log(result)

		this.setState({ votes: result })
		console.log(this.state.votes)
	}

	sendVote() {
		fetch(fetchTools.call('vote/' + this.props.match.params.token, false), { method: "POST", body: JSON.stringify({ candidates: this.state.votes }), headers: { "Content-Type": "application/json" }})
			.then((d) => {
				if (d.status >= 200 && d.status < 300)
					alert("Hlasování bylo úspěšné")
				else
					alert("Nepodařilo se odeslat hlasy")
				this.setState({ back: true });
			});
	}

	render() {
		if (this.state.back) {
			return <Redirect to="/front"/>
		}

		return (
			<Layout title={this.state.name} desc={this.state.desc}>
				<h2 className="layout-votes">Hlasů: {this.state.votes_available - this.state.votes.length}</h2>

				{this.state.candidates.map((value: any, index: any) => (
					<ExpansionPanel key={index}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{value.name} {value.surname}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid
								container
								spacing={24}
								direction="column"
								alignItems="center"
								justify="center"

							>
								<div dangerouslySetInnerHTML={{__html: value.annotation}}>
								</div>
								<div className="layout-button-wrapper">
									<Button
										disabled={this.state.votes.indexOf(value.id) === -1}
										variant="contained"
										color="secondary"
										className="layout-button-btn"
										onClick={() => this.removeVote(value.id)}
									>
										Odebrat hlas
									</Button>
									<p>{ this.state.votes.filter((x) => x === value.id).length }</p>
									<Button
										disabled={this.state.votes_available === this.state.votes.length}
										variant="contained"
										color="primary"
										className="layout-button-btn"
										onClick={() => this.addVote(value.id)}
									>
										Přidat hlas
									</Button>
								</div>
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
				<div className="layout-button-wrapper" style={{ 'paddingTop': "10px" }}>
				{( !this.state.votingConfirm
					?
						<Button variant="contained" className="layout-button-btn" onClick={ () => this.setState({ votingConfirm: true }) }>
							Odeslat hlasy
						</Button>
					:
						(<div>
							<Button variant="contained" className="layout-button-btn" onClick={ () => this.sendVote() }>
								Opravdu?
							</Button>
							<Button variant="contained" className="layout-button-btn" onClick={ () => this.setState({ votingConfirm: false }) }>
								Zrušit
							</Button>
						</div>)
				)}
				</div>
			</Layout>
		)
	}
}
