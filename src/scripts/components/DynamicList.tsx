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


class DynamicList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,

    detail: PropTypes.bool,
    election: PropTypes.bool,

    electionStart: PropTypes.string,
    electionEnd: PropTypes.string,

    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  props: any;

  render() {
    const classes = this.props.classes;

    return (
      <Grid
        container
        spacing={24}
        alignContent="center"
        alignItems="center"
        justify="center"

        className={classNames('layout-grid-content', 'layout-grid-wide')}
      >
        <Paper className="layout-container">
          <Grid
            container
            spacing={24}
            direction="column"
            alignItems="flex-start"
            justify="flex-start"

            className={classNames('layout-grid')}
          >
              {
                this.props.detail
                ?
                <Grid item md={12}>
                    <Typography className={classes.secondaryHeading}>
                      {this.props.electionStart} - {this.props.electionEnd}
                    </Typography>
                </Grid>
                :
                null
              }

              <Grid item md={12}>
                  {this.props.children}
              </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}


export default withStyles(styles)(DynamicList);
