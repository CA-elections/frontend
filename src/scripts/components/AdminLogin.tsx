import * as React from 'react';
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
import FormHelperText from '@material-ui/core/FormHelperText';

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
    showPassword: false,

    error: false,
    errorText: '',

    accepted: false,
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
      let valid = this.props.onSubmit(this.state.password);

      if (valid) {
        this.setState({ accepted: true, error: false });
        // TODO: Route to some loading page.

      } else {
        this.setState({ error: true, errorText: 'Neplatné heslo' });
      }
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
                { this.state.error &&
                  <FormHelperText>{this.state.errorText}</FormHelperText>
                }
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
