import * as React from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = (theme: any) => ({
	heading: {
		fontSize: theme.typography.pxToRem(18),
		fontWeight: theme.typography.fontWeightRegular,
		flexShrink: 0,
		'margin-left': '5px'
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		'margin-left': 'auto',
    'align-self': 'center'
	}
});


class ElectionExpandPanel extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,

		electionId: PropTypes.string.isRequired,
		electionStart: PropTypes.string.isRequired,
		electionEnd: PropTypes.string.isRequired,

		callback: PropTypes.func.isRequired,

		progress: PropTypes.bool,
		student: PropTypes.bool,
	};
	props: any;

	handleClickMoreButton = (id: any, event: any) => {
		this.props.callback(id);
	};

	render() {
		const classes = this.props.classes;

		return (
			<ExpansionPanel className={
				classNames('component-election-panel', {
					'in-progress': this.props.progress,
				})
				}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Icon>account_balance</Icon>

					<Typography className={classes.heading}>
						Volba do školské rady - {
						this.props.student
						?

						'Studenti'
						:
						'Zákonní zástupci'
						}
					</Typography>
					<Typography className={classes.secondaryHeading}>
						{this.props.electionStart} - {this.props.electionEnd}
					</Typography>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails>
					<Grid
						container
						spacing={24}
						direction="column"
						alignItems="center"
						justify="center"

						className="layout-grid-inner"
					>
						<Grid item md="auto">
							{
								!this.props.progress
								?

								<Button
									variant="outlined"
									color="secondary"
									onClick={this.handleClickMoreButton.bind(this, this.props.electionId)}
								>
									Zobrazit detail
								</Button>

								:

								<Button
									disabled

									variant="outlined"
									color="secondary"
								>
									Volby právě probíhají
								</Button>
							}
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

export default withStyles(styles)(ElectionExpandPanel);
