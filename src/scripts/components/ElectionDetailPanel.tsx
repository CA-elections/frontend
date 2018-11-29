import * as React from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import DynamicList from './DynamicList';


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

    );
  }
}


export default withStyles(styles)(ElectionDetailPanel);
