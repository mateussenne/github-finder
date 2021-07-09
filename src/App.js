import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';


class App extends Component{
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null
  };
  
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({
  //     users: response.data,
  //     loading: false
  //   })
  // }

  // Search github users
  searchUsers = async text =>{
    this.setState({loading: true});
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({
      users: response.data.items,
      loading: false
    });
  }

  // Get single github user
  getUser = async login => {
    this.setState({loading: true});
    const response = await axios.get(`https://api.github.com/users/${login}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({
      user: response.data,
      loading: false
    })
  }

  getUserRepos = async login => {
    this.setState({loading: true});
    const response = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({
      repos: response.data,
      loading: false
    })
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}), 5000)
  }

  // Clear users from state
  clearUsers = () => this.setState({users: [], loading: false });

  render(){    
    const { users, user, loading, repos} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClearButton={users.length > 0 ? true : false} setAlert={this.setAlert}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              )}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/user/:login" render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
