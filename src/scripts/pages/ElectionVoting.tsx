import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import Layout from "../layout";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/typography";

interface ElectionVotingProps {
	match: any
}

export default class ElectionVoting extends React.Component<ElectionVotingProps> {
	state = {
		election: {
			name: "Hlasování",
			desc: "Tohle je to nejlepší hlasování ever."
		},
		candidates: [],
	};

	constructor(props: ElectionVotingProps) {
		super(props);

		this.fetchElectionData()
	}

	fetchElectionData() {
		fetch("http://hmmmm.magnusi.tech/api/notification/" + this.props.match.params.token)
			.then(result => {
				return result.json();
			})
			.then(result => {
				this.setState(result)
				console.log(this.state);
			})
	}

	render() {
		return (
			<Layout title={this.state.election.name} desc={this.state.election.desc}>
				{this.state.candidates.map((value: any, index: any) => (
					<ExpansionPanel key={index}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{value.name} {value.surname}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								{value.annotation}
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)}
			</Layout>
		)
	}
}
