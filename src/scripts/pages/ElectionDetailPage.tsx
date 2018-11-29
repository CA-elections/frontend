import * as React from 'react';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';

import Layout from '../layout';
import DynamicList from '../components/DynamicList';
import date_to_string from '../utils/date_to_string';
import CandidateDetail from '../components/CandidateDetail';


export default class extends React.Component {
  props: any;

  state = {
    electionStart: '',
    electionEnd: '',

    isStudent: false,
    token: '',

    candidates: [] as object[]
  };

  updateStateWithData = (data: any) => {
    let start = date_to_string(data.date_start);
    let end = date_to_string(data.date_end);

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
    this.state.token = this.props.match.params.token;
    let token = this.state.token;

    if (token) {
      fetch('http://hmmmm.magnusi.tech/api/election/'
        + this.props.match.params.id,
  			{
  				headers: {
  					'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
  				},
  			}
      )

      .then(response => response.json())
      .then(data => {
        this.updateStateWithData(data);
      }).catch((e: any) => {
        // TODO: Error
      });

    } else {
      fetch('http://hmmmm.magnusi.tech/api/election/'
        + this.props.match.params.id,
  			{
  				headers: {
  					'Content-Type': 'application/json',
  				},
  			}
      )

      .then(response => response.json())
      .then(data => {
        this.updateStateWithData(data);
      }).catch((e: any) => {
        // TODO: Error
      });
    }
  };

  constructor(props: any) {
    super(props);

    this.updateStateWithData = this.updateStateWithData.bind(this);
    this.processCandidates = this.processCandidates.bind(this);
    this._updateWithDummyData = this._updateWithDummyData.bind(this);

    this.state = {
      electionStart: '',
      electionEnd: '',
      token: '',

      isStudent: false,

      candidates: [] as object[]
    };

    this.fetchData();
  }

  render() {
  	return (
  		<Layout title="Detail voleb" back={'/front/' + (this.props.token ? this.props.token : '')}>
        <div className="layout-grid-content">
          <DynamicList
            detail
            electionStart={this.state.electionStart}
            electionEnd={this.state.electionEnd}
            children={this.state.candidates}
          />
  			</div>
  		</Layout>
  	);
  }
}
