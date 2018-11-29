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

	state = {
		elections: [] as Element[]
	};

	constructor(props: any) {
		super(props);

		this.handleShowElectionDetails = this.handleShowElectionDetails.bind(this);
		this.state = {
			elections: props.elections
		};
	}

	render() {
		const classes = this.props.classes;

		return (
			<div className={classes.root}>
				{this.state.elections}
			</div>
		);
	}
}

export default withStyles(styles)(Frontpage);
