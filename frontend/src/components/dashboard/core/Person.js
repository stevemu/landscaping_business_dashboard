import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    ThemeProvider,
    MessageList,
    MessageGroup,
    Message,
    MessageMedia,
    MessageTitle,
    MessageText,
    MessageButtons,
    MessageButton,
    TextComposer,
    Row,
    IconButton,
    AddIcon,
    TextInput,
    SendButton,
    EmojiIcon
} from '@livechat/ui-kit';
import PersonDetail from "../core/PersonDetail";
import ChatComponent from "../core/chat/ChatComponent";
import withChatThemeProvider from '../../../core/withChatThemeProvider';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        scroll: "hidden"
    }
});

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir}
                    style={{padding: 8 * 3, height: window.innerHeight - 160}}>
            {children}
        </Typography>
    );
}


class Person extends React.Component {
    state = {
        value: 1,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };


    render() {
        const {classes, theme, ...restPropsFromParent} = this.props;

        return (
            <div className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Detail"/>
                    <Tab label="Messages"/>
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <PersonDetail
                            {...restPropsFromParent}
                            redirectRoute={this.props.redirectRoute}
                        />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <ChatComponent/>
                    </TabContainer>
                </SwipeableViews>
            </div>
        )

    }


}

export default withChatThemeProvider(withStyles(styles, {withTheme: true})(Person));
