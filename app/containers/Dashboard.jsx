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
      arrayOfPlayers: [],
      objectOfPlayers: {}
    });
  }

  componentDidMount() {
    var options = {
      method: 'get',
      url: '/scrape',
      responseType: 'json'
    };
    axios(options)
      .then(res => {
        console.log('DB - res -> ', res.data);
        this.setState({
          arrayOfPlayers: res.data.arrayOfPlayers,
          objectOfPlayers: res.data.objectOfPlayers
        });
        console.log('this.state!!! - ', this.state);
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
