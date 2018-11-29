import * as React from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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


class ElectionDetailPanel extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,

    electionStart: PropTypes.string.isRequired,
    electionEnd: PropTypes.string.isRequired,

    candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  props: any;

  render() {
    const classes = this.props.classes;

    return (
      <Grid
        container
        spacing={16}
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"

        className="layout-grid-content"
      >
        <Grid item md={6} className="layout-grid-wide">
        <Paper>
          <div className="layout-grid-wide">
              <Typography className={classes.secondaryHeading}>
                {this.props.electionStart} - {this.props.electionEnd}
              </Typography>
          </div>
        </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ElectionDetailPanel);
