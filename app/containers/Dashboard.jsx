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
      array_wr_week_1: [],
      object_wr_week_1: {},
      array_wr_week_2: [],
      object_wr_week_2: {},
      array_wr_week_3: [],
      object_wr_week_3: {},
      array_wr_week_4: [],
      object_wr_week_4: {},
      array_wr_week_5: [],
      object_wr_week_5: {},
      array_wr_week_6: [],
      object_wr_week_6: {},
      array_wr_week_7: [],
      object_wr_week_7: {},
      array_wr_week_8: [],
      object_wr_week_8: {},
      array_wr_week_9: [],
      object_wr_week_9: {},
      array_wr_week_10: [],
      object_wr_week_10: {},
      array_wr_week_11: [],
      object_wr_week_11: {},
      array_wr_week_12: [],
      object_wr_week_12: {},
      array_wr_week_13: [],
      object_wr_week_13: {},
      array_wr_week_14: [],
      object_wr_week_14: {},
      array_wr_week_15: [],
      object_wr_week_15: {},
      array_wr_week_16: [],
      object_wr_week_16: {},

      array_wr_season_2016: [],
      object_wr_season_2016: {}

      array_rb_week_1: [],
      object_rb_week_1: {},
      array_rb_week_2: [],
      object_rb_week_2: {},
      array_rb_week_3: [],
      object_rb_week_3: {},
      array_rb_week_4: [],
      object_rb_week_4: {},
      array_rb_week_5: [],
      object_rb_week_5: {},
      array_rb_week_6: [],
      object_rb_week_6: {},
      array_rb_week_7: [],
      object_rb_week_7: {},
      array_rb_week_8: [],
      object_rb_week_8: {},
      array_rb_week_9: [],
      object_rb_week_9: {},
      array_rb_week_10: [],
      object_rb_week_10: {},
      array_rb_week_11: [],
      object_rb_week_11: {},
      array_rb_week_12: [],
      object_rb_week_12: {},
      array_rb_week_13: [],
      object_rb_week_13: {},
      array_rb_week_14: [],
      object_rb_week_14: {},
      array_rb_week_15: [],
      object_rb_week_15: {},
      array_rb_week_16: [],
      object_rb_week_16: {},

      array_rb_season_2016: [],
      object_rb_season_2016: {}
    });
  }

  componentDidMount() {
    const fetchWeek = (pos, weekNumber) => {
      var tmpUrl = `/${pos}week${weekNumber}`;
      const config = {
        method: 'get',
        url: tmpUrl,
        responseType: 'json'
      }
      return axios(config)
        .then(res => {
          return res;
        });
    }
    const fetchSeason = (pos, seasonNumber) => {
      var tmpUrl = `/${pos}season${seasonNumber}`;
      const config = {
        method: 'get',
        url: tmpUrl,
        responseType: 'json'
      };
      return axios(config)
        .then(res => {
          return res;
        });
    }

    axios.all([fetchWeek('rb', 1), fetchWeek('rb', 2), fetchWeek('rb', 3), fetchWeek('rb', 4), fetchWeek('rb', 5), fetchWeek('rb', 6), fetchWeek('rb', 7), fetchWeek('rb', 8), fetchWeek('rb', 9), fetchWeek('rb', 10), fetchWeek('rb', 11), fetchWeek('rb', 12), fetchWeek('rb', 13), fetchWeek('rb', 14), fetchWeek('rb', 15), fetchWeek('rb', 16), fetchSeason('rb', 2016)])
      .then(axios.spread((week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, season2016) => {
        this.setState({
          array_rb_week_1: week1.data.rbArray,
          object_rb_week_1: week1.data.rbObject,
          array_rb_week_2: week2.data.rbArray,
          object_rb_week_2: week2.data.rbObject,
          array_rb_week_3: week3.data.rbArray,
          object_rb_week_3: week3.data.rbObject,
          array_rb_week_4: week4.data.rbArray,
          object_rb_week_4: week4.data.rbObject,
          array_rb_week_5: week5.data.rbArray,
          object_rb_week_5: week5.data.rbObject,
          array_rb_week_6: week6.data.rbArray,
          object_rb_week_6: week6.data.rbObject,
          array_rb_week_7: week7.data.rbArray,
          object_rb_week_7: week7.data.rbObject,
          array_rb_week_8: week8.data.rbArray,
          object_rb_week_8: week8.data.rbObject,
          array_rb_week_9: week9.data.rbArray,
          object_rb_week_9: week9.data.rbObject,
          array_rb_week_10: week10.data.rbArray,
          object_rb_week_10: week10.data.rbObject,
          array_rb_week_11: week11.data.rbArray,
          object_rb_week_11: week11.data.rbObject,
          array_rb_week_12: week12.data.rbArray,
          object_rb_week_12: week12.data.rbObject,
          array_rb_week_13: week13.data.rbArray,
          object_rb_week_13: week13.data.rbObject,
          array_rb_week_14: week14.data.rbArray,
          object_rb_week_14: week14.data.rbObject,
          array_rb_week_15: week15.data.rbArray,
          object_rb_week_15: week15.data.rbObject,
          array_rb_week_16: week16.data.rbArray,
          object_rb_week_16: week16.data.rbObject,
          array_rb_season_2016: season2016.data.rbArray,
          object_rb_season_2016: season2016.data.rbObject
        });
        
        console.log('RB this.state - ', this.state);
      }));

    // RUNNING BACKS

    // WR
    axios.all([fetchWeek('wr', 1), fetchWeek('wr', 2), fetchWeek('wr', 3), fetchWeek('wr', 4), fetchWeek('wr', 5), fetchWeek('wr', 6), fetchWeek('wr', 7), fetchWeek('wr', 8), fetchWeek('wr', 9), fetchWeek('wr', 10), fetchWeek('wr', 11), fetchWeek('wr', 12), fetchWeek('wr', 13), fetchWeek('wr', 14), fetchWeek('wr', 15), fetchWeek('wr', 16), fetchSeason('wr', 2016)])
      .then(axios.spread((week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, season2016) => {
        this.setState({
          array_wr_week_1: week1.data.wrArray,
          object_wr_week_1: week1.data.wrObject,
          array_wr_week_2: week2.data.wrArray,
          object_wr_week_2: week2.data.wrObject,
          array_wr_week_3: week3.data.wrArray,
          object_wr_week_3: week3.data.wrObject,
          array_wr_week_4: week4.data.wrArray,
          object_wr_week_4: week4.data.wrObject,
          array_wr_week_5: week5.data.wrArray,
          object_wr_week_5: week5.data.wrObject,
          array_wr_week_6: week6.data.wrArray,
          object_wr_week_6: week6.data.wrObject,
          array_wr_week_7: week7.data.wrArray,
          object_wr_week_7: week7.data.wrObject,
          array_wr_week_8: week8.data.wrArray,
          object_wr_week_8: week8.data.wrObject,
          array_wr_week_9: week9.data.wrArray,
          object_wr_week_9: week9.data.wrObject,
          array_wr_week_10: week10.data.wrArray,
          object_wr_week_10: week10.data.wrObject,
          array_wr_week_11: week11.data.wrArray,
          object_wr_week_11: week11.data.wrObject,
          array_wr_week_12: week12.data.wrArray,
          object_wr_week_12: week12.data.wrObject,
          array_wr_week_13: week13.data.wrArray,
          object_wr_week_13: week13.data.wrObject,
          array_wr_week_14: week14.data.wrArray,
          object_wr_week_14: week14.data.wrObject,
          array_wr_week_15: week15.data.wrArray,
          object_wr_week_15: week15.data.wrObject,
          array_wr_week_16: week16.data.wrArray,
          object_wr_week_16: week16.data.wrObject,
          array_wr_season_2016: season2016.data.wrArray,
          object_wr_season_2016: season2016.data.wrObject
        });
        
        console.log('WR this.state - ', this.state);
      }));
    

      // LEFT OFF HERE: NEED TO SET UP DRY FETCH SEASON FUNCTION....

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
