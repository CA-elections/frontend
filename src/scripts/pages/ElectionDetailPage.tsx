import * as React from 'react';
import Layout from '../layout';

import Grid from '@material-ui/core/Grid';

import CandidateDetail from '../components/CandidateDetail';
import ElectionDetailPanel from '../components/ElectionDetailPanel';


export default class extends React.Component {
  props: any;

  state = {
    electionStart: '',
    electionEnd: '',

    isStudent: false,

    candidates: [] as object[]
  };

  updateStateWithData = (data: any) => {
    let start = data.date_start.split('T')[0].split('-').reverse().join('. ');
    let end = data.date_end.split('T')[0].split('-').reverse().join('. ');

    this.setState({
      electionStart: start,
      electionEnd: end,

      candidates: this.processCandidates(data.candidates),

      isStudent: data.is_student
    });
  };

  processCandidates = (candidates: any) => {
    let total = candidates.reduce((x: any, y: any) => x.votes + y.votes);

    let a = candidates.map((x: any, i: any) => (
      <CandidateDetail
        { ...this.state.isStudent && 'student' }
        name={x.name + ' ' + x.surname}
        annotation={x.annotation}
        percent={x.votes / total}
        key={i}
      />
    ));

    return a;
  };

  _updateWithDummyData = () => {
    this.updateStateWithData({
      date_start: '2001-01-01T00:00',
      date_end: '2002-02-02T00:00',
      is_student: true,
      candidates: [
        {
          id: 1,
          name: 'Foo',
          surname: 'FooS',
          annotation: 'Blah blah blah',
          votes: 15
        },
        {
          id: 2,
          name: 'Bar',
          surname: 'BarS',
          annotation: 'Blah blah blah',
          votes: 32
        },
        {
          id: 3,
          name: 'Baz',
          surname: 'BazS',
          annotation: 'Blah blah blah',
          votes: 51
        },
        {
          id: 4,
          name: 'Qux',
          surname: 'QuxS',
          annotation: 'Blah blah blah',
          votes: 16
        },
        {
          id: 5,
          name: 'Pox',
          surname: 'PoxS',
          annotation: 'Blah blah blah',
          votes: 43
        },
      ]
    });
  };

  fetchData = () => {
    // TODO: this.props.match.params.token

    fetch('http://127.0.0.1:8000/api/election/'
      + this.props.match.params.id,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:8000/',
				},
        credentials: 'include',
				method: 'GET',
			}
    )

    .then(response => response.json())
    .then(data => {
      this.updateStateWithData(data);
    }).catch((e: any) => {
      this._updateWithDummyData();
    });
  };

  constructor(props: any) {
    super(props);

    this.updateStateWithData = this.updateStateWithData.bind(this);
    this.processCandidates = this.processCandidates.bind(this);
    this._updateWithDummyData = this._updateWithDummyData.bind(this);

    this.state = {
      electionStart: '',
      electionEnd: '',

      isStudent: false,

      candidates: [] as object[]
    };

    this.fetchData();
  }

  render() {
  	return (
  		<Layout>
        <Grid
          container
          spacing={24}
          direction="column"
          alignContent="center"
          alignItems="center"
          justify="center"

          className="layout-grid-content"
        >
  				<ElectionDetailPanel
            electionStart={this.state.electionStart}
            electionEnd={this.state.electionEnd}

            candidates={this.state.candidates}
          />
  			</Grid>
  		</Layout>
  	);
  }
}
