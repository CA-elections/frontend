import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const styles = {
  root: {
    display: 'flex',
  },
  textField: {
    flexBasis: 200,
  },
};


class AdminLogin extends React.Component {
	props: any;

  state = {
    password: '',
    showPassword: false
  }


  handleChangePassword = (event: any) => {
    this.state.password = event.target.value;
  };

  handleClickShowPassword = () => {
    this.state.showPassword = !this.state.showPassword;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="passwordField">Heslo</InputLabel>
          <Input
            id="passwordField"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Přepnout viditelnost hesla"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles)(AdminLogin);
