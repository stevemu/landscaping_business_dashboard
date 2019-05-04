import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import PersonDetail from "../core/PersonDetail";
import Chat from "../core/chat/Chat";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    }
});

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}


class Worker extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Detail" />
                    <Tab label="Messages" />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <PersonDetail
                            {...this.props}
                            redirectRoute={this.props.redirectRoute}
                        />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Chat />
                    </TabContainer>
                </SwipeableViews>
            </div>
        )

    }


}

export default withStyles(styles, { withTheme: true })(Worker);
