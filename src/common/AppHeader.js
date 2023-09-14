import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
//import pollIcon from '../poll.svg';
import logoIcon from '../images/logo.png'
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        /*alert(JSON.stringify(this.props.currentUser));*/
        if(this.props.currentUser) {
          menuItems = [

            <Menu.Item key="/">
              <Link to="/">
                {/*<Icon type="home" className="nav-icon" />*/}
                  Home
              </Link>
            </Menu.Item>,

            <Menu.Item key="/postingstatus/list">
              <Link to="/postingstatus/list">
                  {/*<img src={pollIcon} alt="poll" className="poll-icon" />*/}
                  Posting Status
              </Link>
            </Menu.Item>,

            //<Menu.Item key="/promotion/new">
           // <Link to="/promotion/new">
                //{/*<img src={pollIcon} alt="poll" className="poll-icon" />*/}
                //Promotion Information
            //</Link>
           // </Menu.Item>,

           <Menu.Item key="/promotion/list">
            <Link to="/promotion/list">
                {/*<img src={pollIcon} alt="poll" className="poll-icon" />*/}
                Promotion Information
            </Link>
            </Menu.Item>,

            <Menu.Item key="/spouseinfo/list">
            <Link to="/spouseinfo/list">
                {/*<img src={pollIcon} alt="poll" className="poll-icon" />*/}
                Spouse Information
            </Link>
            </Menu.Item>,

            <Menu.Item key="/foreigntraining/list">
            <Link to="/foreigntraining/list">
                {/*<img src={pollIcon} alt="poll" className="poll-icon" />*/}
                Foreign Training
            </Link>
            </Menu.Item>,

            <Menu.Item key="/profile" className="profile-menu">
             <ProfileDropdownMenu
              currentUser={this.props.currentUser}
              handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>                  
          ];
        }

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">
                    <img src={logoIcon} alt="logo" className="logo-icon" width={50} height={50}/>
                </Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);