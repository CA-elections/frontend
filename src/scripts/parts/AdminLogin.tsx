import * as React from "react";
import { withStyle } from "@material-ui/core/styles";
import classNames from "classnames";

import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornments";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const styles = theme => ({
  root: {
    flexGrow: 1
  },

  grow: {
    flexGrow: 1
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class AdminLogin extends React.Component {
  state = {
    password: "",
    showPassword = false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  };

  handleClickShowPassword = () => {
    this.setState(state => { showPassword: !state.showPassword });
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form className={classes.grow}>
          <FormControl className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adminPasswordField">Heslo</InputLabel>
            <Input
              id="adminPasswordField"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
            />
          </FormControl>
        </form>
      </div>
    );
  }
}


export default withStyles(styles)(AdminLogin);
