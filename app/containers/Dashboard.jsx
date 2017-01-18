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
      array_receivers_week_1: [],
      object_receivers_week1: {},
      array_receivers_season_2016: [],
      object_receivers_season_2016: {},

      array_runningbacks_week_1: [],
      object_runningbacks_week1: {},
      array_runningbacks_season_2016: [],
      object_runningbacks_season_2016: {}
    });
  }

  componentDidMount() {
    var wrOptionsWeek1 = {
      method: 'get',
      url: '/wrweek1',
      responseType: 'json'
    };
    axios(wrOptionsWeek1)
      .then(res => {
        console.log(' wr week 1- res -> ', res.data);
        this.setState({
          array_receivers_week_1: res.data.arrayOfPlayers,
          object_receivers_week1: res.data.objectOfPlayers
        });
        console.log('1. this.state!!! WR WEEK 1 - ', this.state);
      });

    var wrOptionsSeason = {
      method: 'get',
      url: '/wrseason2016',
      responseType: 'json'
    };
    axios(wrOptionsSeason)
      .then(res => {
        console.log('wr 2016 season - res -> ', res.data);
        this.setState({
          array_receivers_season_2016: res.data.arrayOfPlayers,
          object_receivers_season_2016: res.data.objectOfPlayers
        });
        console.log('2 this.state!!! WR SEASON TOTAL - ', this.state);
      });
    
    var rbOptionsWeek1 = {
      method: 'get',
      url: '/rbweek1',
      responseType: 'json'
    };
    axios(rbOptionsWeek1)
      .then(res => {
        console.log('rb week 1 res - ', res.data);
        this.setState({
          array_runningbacks_week_1: res.data.rbArray,
          object_runningbacks_week1: res.data.rbObject
        });
        console.log('3. this.state!!! RB WEEK 1 - ', this.state);
      });

    var rbOptionsSeason = {
      method: 'get',
      url: '/rbseason2016',
      responseType: 'json'
    };
    axios(rbOptionsSeason)
      .then(res => {
        console.log('rb 2016 season - ', res.data);
        this.setState({
          array_runningbacks_season_2016: res.data.rbArray,
          object_runningbacks_season_2016: res.data.rbObject
        });
        console.log('4 this.state!!! RB SEASON TOTAL - ', this.state);
        console.log('#1 running back of the season is ', this.state.array_runningbacks_season_2016[0].playerName, ' @ ', this.state.array_runningbacks_season_2016[0].fantasyPtsPerGame, ' fantasy pts/gm');
      });

  }

  render() {
    return (
      <div>
        <div>
        2016 Best Runningbacks:
        </div>
      </div>
    )
  }
}

export default Dashboard;
