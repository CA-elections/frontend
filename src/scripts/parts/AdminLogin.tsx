import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class AdminLogin extends React.Component {
	props: any;

  state = {
    password: '',
    showPassword: false
  }


  handleChangePassword = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    return (
      <Grid
        container
        spacing={24}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}></Grid>

        <Grid item sm={12}>
          <Paper>
            <Grid
              container
              spacing={24}
              direction="column"
              alignItems="center"
              justify="center"

              className="layout-content-grid"
            >
              <Grid item xs="auto">
                  <Typography variant="title" color="inherit" className="layout-title">
                    Administrátor - Přihlášení
                  </Typography>
              </Grid>

              <Grid item xs="auto">
                <FormControl className="text-field">
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
              </Grid>

              <Grid item xs="auto">
                <Button variant="contained" className="layout-button">
                  Přihlásit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
