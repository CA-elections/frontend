import * as React from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';


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


class DynamicList extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,

		detail: PropTypes.bool,

		electionStart: PropTypes.string,
		electionEnd: PropTypes.string,

		children: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
	props: any;

	render() {
		const classes = this.props.classes;

		return (
			<div className={classNames('layout-grid-content', 'layout-container')}>
				<Paper className="layout-container">
					<div className={classNames('layout-grid-inner')}>
						{
							this.props.detail
							?
							<Typography className={classes.secondaryHeading}>
								{this.props.electionStart} - {this.props.electionEnd}
							</Typography>
							:
							null
						}

						{this.props.children}
					</div>
				</Paper>
			</div>
		);
	}
}


export default withStyles(styles)(DynamicList);
