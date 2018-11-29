import * as React from "react";
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


const styles = (theme: any) => ({
	root: {
		width: '80%',
		margin: '50px auto 0'
	}
});


class Frontpage extends React.Component {
	props: any;

	handleShowElectionDetails = (electionId: any) => {
		alert(electionId);
	};

	updateStateWithData = (data: any) => {
    if (data === []) {
			this.setState({ empty: true });

		} else {
			this.setState({ empty: false, elections: this.processElections(data) });
		}
  };

  processElections = (elections: any) => {
    let a = elections.map((election: any, i: any) => (
			<ElectionExpandPanel
				electionId={election.id}
				electionStart={date_to_string(election.date_start)}
				electionEnd={date_to_string(election.date_end)}

				callback={this.handleShowElectionDetails}

				{ ...election.is_student ? 'student' : null }
				{ ...Date.parse(election.date_start) <= Date.now() && Date.now() <= Date.parse(election.date_end) ? 'progress' : null }
				adultDeputy={ election.is_student ? election }
			/>
		));

		return a;
  };

  _updateWithDummyData = () => {
    this.updateStateWithData([
			{
				'id': 1,
				'date_start': '2001-01-01T00:00',
				'date_end': '2002-02-02T00:00',
				'is_student': true,
			},
		]);
  };

  fetchData = () => {
    // TODO: this.props.match.params.token

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
      this._updateWithDummyData();
    });
  };

	state = {
		elections: [] as Element[],
		empty: true,
	};

	constructor(props: any) {
		super(props);

		this.handleShowElectionDetails = this.handleShowElectionDetails.bind(this);
		this.fetchData();
	}

	render() {
		const classes = this.props.classes;

		return (
			<Layout>
				<div className={classes.root}>
						{this.state.elections}
				</div>
			</Layout>
		);
	}
}

export default withStyles(styles)(Frontpage);
