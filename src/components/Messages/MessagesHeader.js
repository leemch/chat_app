import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react"

class MessagesHeader extends React.Component {
    render(){
        const {channelName, numUniqueUsers, handleSearchTerm, searchLoading, isPrivateChannel, isChannelStarred, handleStar} = this.props;
        return(
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                    <span>
                        {channelName}
                        {!isPrivateChannel && (
                            <Icon 
                            onClick={handleStar} 
                            name={isChannelStarred ? "star" : "star outline"} 
                            color={isChannelStarred ? "yellow" : "black"} 
                            
                            />
                            )}
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input
                    loading={searchLoading}
                    onChange={handleSearchTerm}
                    size="mini"
                    icon="search"
                    name="searchItem"
                    placeholder="Search Messages"
                    />
                </Header>
            </Segment>

        )
    }
}
export default MessagesHeader;