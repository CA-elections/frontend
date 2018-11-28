import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import Cached from '@material-ui/icons/Cached';


export default class LoadingBox extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={24}
        direction="column"
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
          <Typography variant="h6">
            Foo
          </Typography>
        </Grid>
        </Paper>
      </Grid>
    );
  }
}
