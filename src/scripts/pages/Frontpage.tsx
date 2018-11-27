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

const styles = (theme: any) => ({
	root: {
		width: '80%',
		margin: '50px auto 0'
	},
	panel: {
		'border-left': '3px solid red'
	},
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

function Frontpage(props: any) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<ExpansionPanel className={classNames('panel-expansion','view-red')}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Icon>account_balance</Icon>
					<Typography className={classes.heading}>Election for the new president</Typography>
					<Typography className={classes.secondaryHeading}>
						30.11.2018 - 05.12.2018
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
					<Button variant="contained" color="primary" >
						Primary
					</Button>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel className={classNames('panel-expansion','view-green')}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Icon>account_balance</Icon>
					<Typography className={classes.heading}>Election to the EU parlamentt</Typography>
					<Typography className={classes.secondaryHeading}>
						20.11.2018 - 27.11.2018
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classNames('panel-asd'}>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
					<Button variant="contained" color="primary" >
						Primary
					</Button>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default withStyles(styles)(Frontpage);
