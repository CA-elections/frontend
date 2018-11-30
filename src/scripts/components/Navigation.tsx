import * as React from "react";
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
	props: any;

	state = {
		backPage: '',
		forwardPage: '',
	};

	handleClickBack = () => {
		//console.log(this.props.back);
		this.setState({ backPage: this.props.back });
	};

	handleClickLogin = () => {
		this.setState({ backPage: '/login' })
	};

	render() {
		const classes = this.props.classes;

		if (this.state.backPage) {
			return (
				<Redirect to={this.state.backPage}/>
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
/*<<<<<<< HEAD
=======
							!this.props.token &&
							<Button
								className="component-tool-right"
								color="inherit"

								onClick={this.handleClickLogin}
							>
								Přihlásit se
							</Button>
						}

						{
>>>>>>> Navigation: Added back button*/
							this.props.back &&

							(
								this.props.token

								?

								<IconButton
									className="component-tool-right"
									color="inherit"

									onClick={this.handleClickBack}
								>
									<Icon>arrow_back</Icon>
								</IconButton>

								:

								<IconButton
									color="inherit"

									onClick={this.handleClickBack}
								>
									<Icon>arrow_back</Icon>
								</IconButton>
							)
						}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}


export default withStyles(styles)(Navigation);
