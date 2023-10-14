import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';

import AddGeneralInfo from "../generalinfo/AddGeneralInfo";
import GeneralInfoList from "../generalinfo/GeneralInfoList";

import ForeignTrainingList from '../foreigntraining/ForeignTrainingList';
import AddForeignTraining from '../foreigntraining/AddForeignTraining';
import EditForeignTraining from '../foreigntraining/EditForeignTraining';

import PostingStatusList from '../postingstatus/PostingStatusList';
import AddPostingStatus from '../postingstatus/AddPostingStatus';
import EditPostingStatus from "../postingstatus/EditPostingStatus";


import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import AddAward from '../award/AddAward';
import AwardList from '../award/AwardList';
import EditAward from '../award/EditAward';

import AddPromotion from '../promotion/AddPromotion';
import PromotionList from '../promotion/PromotionList';
import EditPromotion from '../promotion/EditPromotion';

import { Layout, notification } from 'antd';
import EditGeneralInfo from "../generalinfo/EditGeneralInfo";
import Welcome from "../Home/Welcome";


//import DatePicker from 'react-datepicker'

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'PMIS',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'PMIS',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                {/*<Route exact path="/"
                  render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>*/}
                <Route exact path="/"
                       render={(props) => <Welcome isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                
                
                
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/promotion/list" component={PromotionList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/promotion/new" component={AddPromotion} handleLogout={this.handleLogout}></PrivateRoute>            
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/promotion/edit/:id" component={EditPromotion} handleLogout={this.handleLogout}></PrivateRoute>            

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/award/list" component={AwardList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/award/new" component={AddAward} handleLogout={this.handleLogout}></PrivateRoute>            
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/award/edit/:id" component={EditAward} handleLogout={this.handleLogout}></PrivateRoute>            

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/generalinfo/list" component={GeneralInfoList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/generalinfo/new" component={AddGeneralInfo} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/generalinfo/edit/:id" component={EditGeneralInfo} handleLogout={this.handleLogout}></PrivateRoute>
                
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/foreigntraining/list" component={ForeignTrainingList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/foreigntraining/new" component={AddForeignTraining} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/foreigntraining/edit/:id" component={EditForeignTraining} handleLogout={this.handleLogout}></PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/postingstatus/list" component={PostingStatusList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/postingstatus/new" component={AddPostingStatus} handleLogout={this.handleLogout}></PrivateRoute>                
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/postingstatus/edit/:id" component={EditPostingStatus} handleLogout={this.handleLogout}></PrivateRoute>

                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
