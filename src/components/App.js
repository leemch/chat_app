import React from 'react';
import {Grid} from "semantic-ui-react";
import './App.css';
import {connect} from "react-redux";

import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";

const App = ({currentUser, currentChannel}) => (


      <Grid columns="equal" className="app" style={{background: "#eee"}}>
        <ColorPanel />
        <SidePanel 
        ket={currentUser && currentUser.id}
        currentUser={currentUser}/>

        <Grid.Column style={{marginLeft: 320}}>
          <Messages
          currentChannel={currentChannel}
          key={currentChannel && currentChannel.id}
          currentUser={currentUser}
           />
        </Grid.Column>
        
        <Grid.Column width={4}>
        <MetaPanel />
        </Grid.Column>
        
      </Grid>
)
  
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel

});

export default connect(mapStateToProps)(App);
