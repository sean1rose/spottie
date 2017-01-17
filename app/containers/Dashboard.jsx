import React, { Component } from 'react';
// import { controllers } from '../../db';
import axios from 'axios';

// console.log('dash controllers - ', controllers);
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
// const Dashboard = () => <div>Welcome to the Dasboard. Stay tuned...</div>;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = ({
      week1ArrayOfPlayers: [],
      week1ObjectOfPlayers: {},
      seasonArrayOfPlayers: [],
      seasonObjectOfPlayers: {}
    });
  }

  componentDidMount() {
    var optionsWeek1 = {
      method: 'get',
      url: '/wrweek1',
      responseType: 'json'
    };
    axios(optionsWeek1)
      .then(res => {
        console.log('DB - res -> ', res.data);
        this.setState({
          week1ArrayOfPlayers: res.data.arrayOfPlayers,
          week1ObjectOfPlayers: res.data.objectOfPlayers
        });
        console.log('1 this.state!!! WEEK 1 - ', this.state);
      });

    var optionsSeason = {
      method: 'get',
      url: '/wrseason2016',
      responseType: 'json'
    };
    axios(optionsSeason)
      .then(res => {
        console.log('DB - res -> ', res.data);
        this.setState({
          seasonArrayOfPlayers: res.data.arrayOfPlayers,
          seasonObjectOfPlayers: res.data.objectOfPlayers
        });
        console.log('2 this.state!!! SEASON TOTAL - ', this.state);
      });

  }

  render() {
    return (
      <div>
        HELLO
      </div>
    )
  }
}

export default Dashboard;
