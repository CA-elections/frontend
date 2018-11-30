import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';


const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};


class Navigation extends React.Component {
	static propTypes = {
		back: PropTypes.string.isRequired,
		current: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
		noCreateElections: PropTypes.bool,
	};
	props: any;

	state = {
		backPage: '',
		forwardPage: '',
	};

	handleClickLogin = () => {
		this.setState({ forwardPage: 'login/' + this.props.current.replace(/\//, '\\') });
	};

	handleClickAddElection = () => {
		this.setState({ forwardPage: 'create-election/' + this.props.token + '/' + this.props.current.replace(/\//, '\\')/* + '\\' + this.props.token*/ });
	};

	handleClickBack = () => {
		if (this.props.thisIsCreateElections) {
			let sure = confirm('Chcete tuto stránku opravdu opustit? Přijdete o současné nastavení!');

			if (sure) {
				this.setState({ backPage: this.props.back });
			}

		} else {
			this.setState({ backPage: this.props.back });
		}
	};

	constructor(props: any) {
		super(props);

		this.handleClickBack = this.handleClickBack.bind(this);
		this.handleClickLogin = this.handleClickLogin.bind(this);
		this.handleClickAddElection = this.handleClickAddElection.bind(this);

		this.state = {
			backPage: '',
			forwardPage: '',
		};
	}

	render() {
		const classes = this.props.classes;

		console.log('Navigation (`back`): ' + this.props.back);
		console.log('Navigation (`backPage`): ' + this.state.backPage);
		console.log('Navigation (`forwardPage`): ' + this.state.forwardPage);
		console.log('Navigation (`current`): ' + this.props.current);

		if (this.state.backPage) {
			return (
				<Redirect to={'/' + this.state.backPage.replace(/\\/, '/')}/>
			);
		} else if (this.state.forwardPage) {
			return (
				<Redirect to={'/' + this.state.forwardPage}/>
			);
		}

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<img src="./static/images/logo.png" alt="" className="menu-image"/>

						<Typography variant="h6" color="inherit" className={classes.grow}>
							Kepler - Hlasování
						</Typography>

						{
							(this.props.token === '' || this.props.token === undefined) &&
							<Button
								className="component-tool-right"
								color="inherit"

								onClick={this.handleClickLogin}
							>
								Přihlásit se
							</Button>
						}

						{
							(this.props.token !== '' && this.props.token !== '###---###' && this.props.token !== undefined && !this.props.thisIsCreateElections) &&
							<Button
								className="component-tool-right"
								color="inherit"

								onClick={this.handleClickAddElection}
							>
								Vytvořit volby
							</Button>
						}

						{
							this.props.back &&

							<IconButton
								className="component-tool-right"
								color="inherit"

								onClick={this.handleClickBack}
							>
								<Icon>arrow_back</Icon>
							</IconButton>
						}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}


export default withStyles(styles)(Navigation);
