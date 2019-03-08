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


class CandidateExpandPanel extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,

		name: PropTypes.string.isRequired,
		annotation: PropTypes.string.isRequired,

		admin: PropTypes.bool,
		student: PropTypes.bool,
		percent: PropTypes.number.isRequired,
		votes: PropTypes.number,
	};
	props: any;

	handleClickMoreButton = (id: any, event: any) => {
		this.props.callback(id);
	};

	render() {
		const classes = this.props.classes;

		return (
			<ExpansionPanel className="component-candidate-panel">
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography className={classes.heading}>{this.props.name}</Typography>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails>
					<Grid
						container
						alignItems="flex-start"
						justify="flex-start"

						className={classNames('layout-grid-inner', 'layout-container')}
					>
						<Grid item md={12}>
							<Typography variant="caption">
								{
									this.props.student
									?
									'Zletilý student'
									:
									'Dospělý'
								}
							</Typography>
						</Grid>

						<Grid item md={6}>
							<Typography variant="h4">
								{
									isNaN(this.props.percent) || this.props.percent === undefined ?
									'Nikdo nehlasoval'
									: this.props.percent.toString() + ' %'
								}
							</Typography>
						</Grid>

						{
							this.props.admin &&
							<Grid item md={6}>
								<Typography variant="h4">
									{this.props.votes} hlasů
								</Typography>
							</Grid>
						}

						<Grid item md={12} className="layout-grid-inner">
							<Typography variant="body2" dangerouslySetInnerHTML={{__html: this.props.annotation}}/>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}


export default withStyles(styles)(CandidateExpandPanel);
