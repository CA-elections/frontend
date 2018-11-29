import * as React from "react";
import Layout from "../layout";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/typography";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

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
		votes: Array()
	};

	constructor(props: ElectionVotingProps) {
		super(props);

		this.fetchCodeData()
		this.addVote = this.addVote.bind(this)
		this.removeVote = this.removeVote.bind(this)
	}

	fetchCodeData() {
		const baseUrl = "http://hmmmm.magnusi.tech/api";
		fetch(baseUrl + "/notification/" + this.props.match.params.token)
			.then(result => {
				return result.json();
			})
			.then(result => {
				this.setState(result)

				fetch(baseUrl + "/election/" + this.state.election_id)
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

	render() {
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
								<Typography>
									{value.annotation} Prosím tohle potom smazat, je to tu jenom protože sem nidko nedal žádnou anotaci
								</Typography>
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
				)}
			</Layout>
		)
	}
}
