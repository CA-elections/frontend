import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';

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
  static propTypes = {
    onSubmit: PropTypes.object.isRequired
  };
  props: any;

  state = {
    password: '',
    error: false,
    errorText: '',
    showPassword: false
  }

  handleChangePassword = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickSubmit = () => {
    if (this.state.password === '') {
      this.setState({ error: true, errorText: 'Vyplňte heslo' });

    } else {
      this.props.onSubmit(this.state.password);
    }
  };

  render() {
    return (
      <Grid
        container
        spacing={24}
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"

        className="layout-content-grid"
      >
          <Paper>
            <Grid
              container
              spacing={24}
              direction="column"
              alignItems="center"
              justify="center"

              className="layout-inner-grid"
            >
              <Grid item md="auto">
                <FormControl className="text-field">
                  <InputLabel
                    htmlFor="passwordField"
                    error={this.state.error}
                  >
                    Heslo
                  </InputLabel>

                  <Input
                    id="passwordField"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    error={this.state.error}
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

              <Grid item md="auto">
                <Button
                  variant="contained"
                  color="primary"
                  className="layout-button"
                  onClick={this.handleClickSubmit}
                >
                  Přihlásit
                </Button>
              </Grid>
            </Grid>
          </Paper>

      </Grid>
    );
  }
}
