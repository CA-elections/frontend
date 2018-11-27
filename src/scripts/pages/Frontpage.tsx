import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme: any) => ({
	root: {
		width: '80%',
		margin: '50px auto 0'
	},
	heading: {
		fontSize: theme.typography.pxToRem(18),
		fontWeight: theme.typography.fontWeightRegular,
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		'margin-left': 'auto'
	}
});

function Frontpage(props: any) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>Election to the EU parlamentt</Typography>
					<Typography className={classes.secondaryHeading}>
						20.11.2018 - 27.11.2018
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default withStyles(styles)(Frontpage);
