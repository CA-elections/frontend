import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


class Candidate extends React.Component {
	constructor(props: any) {
		super(props);
	}
	props: any;

	onChange = {
		name: (e: any) => {
			this.props.onChange({
				name: e.target.value,
				surname: this.props.candidate.surname,
				annotation: this.props.candidate.annotation
			});
		},
		surname: (e: any) => {
			this.props.onChange({
				name: this.props.candidate.name,
				surname: e.target.value,
				annotation: this.props.candidate.annotation
			});
		},
		annotation: (e: any) => {
			this.props.onChange({
				name: this.props.candidate.name,
				surname: this.props.candidate.surname,
				annotation: e.target.value
			});
		}
	};

	render() {
		return (
			<Grid>
				<TextField
					id="standard-name"
					label="Name"
					value={this.props.candidate.name}
					onChange={this.onChange.name}
					margin="normal"
				/>
				<TextField
					id="standard-surname"
					label="Surname"
					value={this.props.candidate.surname}
					onChange={this.onChange.surname}
					margin="normal"
				/>
				<TextField
					id="standard-annotation"
					label="Annotation"
					value={this.props.candidate.annotation}
					onChange={this.onChange.annotation}
					margin="normal"
				/>
			</Grid>
		);
	}
}


export default class CreateElection extends React.Component {
	static propTypes = {
		/*   errorMsg: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,

		onSubmit: PropTypes.object.isRequired
		*/
	};

	props: any;
	state = {
		candidates: [] as Element[],
		candidates_len: 0,
		startingDate: "2012-12-12T12:12",
		endDate: "2012-12-12T12:12",
		isStudent: false,
		name: "",
		description: "",
		token: '',
		accepted: false,
	};

	constructor(props: any) {
		super(props);

		this.state = {
			candidates: [],
			candidates_len: 0,
			startingDate: "2012-12-12T12:12",
			endDate: "2012-12-12T12:12",
			isStudent: false,
			name: "elections",
			description: "",
			token: '',
			accepted: false,
		};
	}

	onUpdate = {
		startingDate: (e: any) => {
			this.setState({ startingDate: e.target.value });
		},
		endDate: (e: any) => {
			this.setState({
				endDate: e.target.value
			});
		},
		candidate: (index: any) => (candidate: any) => {
			this.setState(function(state: any) {
				let new_candidates = state.candidates;
				new_candidates[index] = candidate;
				return {
					candidates: new_candidates
				};
			});
		},
		isStudent: (e: any) => {
			this.setState({
				isStudent: e.target.checked
			});
		},
		name: (e: any) => {
			this.setState({
				name: e.target.value
			});
		},
		description: (e: any) => {
			this.setState({
				description: e.target.value
			});
		}
	};

	handleClick = {
		addCandidate: (e: any) => {
		e.preventDefault();
		this.setState(function(state: any) {
			let new_candidates = state.candidates;
			new_candidates[state.candidates_len] = {
				name: "",
				surname: "",
				annotation: ""
			};
			return {
				candidates: new_candidates,
				candidates_len: state.candidates_len + 1
			};
		});
		}
	};

	render() {
		if (this.state.accepted) {
			return <Redirect to={"/front/" + this.state.token} />;
		}

		let candidateComponents = [];

		for (let i = 0; i < this.state.candidates_len; ++i) {
			candidateComponents.push(
				<Candidate
					key={i}
					candidate={this.state.candidates[i]}
					onChange={this.onUpdate.candidate(i)}
				/>
			);
		}

		return (
			<Paper className="layout-container">
				<Grid
					container
					spacing={24}
					direction="column"
					alignItems="center"
					justify="center"
					className={classNames("layout-grid-inner", "layout-container")}
				>
					<Grid item md="auto">
						<FormControl>
							<TextField
								id="dateStartField"
								label="Starting Date"
								type="datetime-local"
								value={this.state.startingDate}
								onChange={this.onUpdate.startingDate}
								InputLabelProps={{
									shrink: true
								}}
							/>
							<TextField
								id="dateEndField"
								label="End Date"
								type="datetime-local"
								value={this.state.endDate}
								onChange={this.onUpdate.endDate}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item md="auto">
						<FormControlLabel
							control={
								<Switch
									onChange={this.onUpdate.isStudent}
									checked={this.state.isStudent}
								/>
							}
							label="Is Student"
						/>
					</Grid>

					<Grid item md="auto">
						{candidateComponents}
					</Grid>

					<Grid item md="auto">
						<Button
							variant="contained"
							color="primary"
							className="layout-button"
							onClick={this.handleClick.addCandidate}
						>
							Přidat kandidáta
						</Button>
					</Grid>

					<Grid item md="auto">
						<Button
							variant="contained"
							color="primary"
							className="layout-button"
							onClick={this.handleClickSubmit}
						>
							Vytvořit volby
						</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}
