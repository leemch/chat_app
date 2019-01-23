import React from 'react';
import {Grid} from "semantic-ui-react";
import './App.css';
import {connect} from "react-redux";

import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";

const App = ({currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor}) => (


      <Grid columns="equal" className="app" style={{background: secondaryColor}}>
        <ColorPanel currentUser={currentUser} key={currentUser && currentUser.name}/>
        <SidePanel 
        ket={currentUser && currentUser.id}
        currentUser={currentUser}
          primaryColor={primaryColor}
        />

        <Grid.Column style={{marginLeft: 320}}>
          <Messages
          currentChannel={currentChannel}
          key={currentChannel && currentChannel.id}
          currentUser={currentUser}
          isPrivateChannel = {isPrivateChannel}
           />
        </Grid.Column>
        
        <Grid.Column width={4}>
        <MetaPanel 
        key={currentChannel && currentChannel.id}
        userPosts={userPosts}
        isPrivateChannel={isPrivateChannel}
        currentChannel={currentChannel}
        />
        </Grid.Column>
        
      </Grid>
)
  
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor

});

export default connect(mapStateToProps)(App);
