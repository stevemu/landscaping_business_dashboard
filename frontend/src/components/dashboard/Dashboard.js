import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import {
    removeLocalToken,
    logout,
    getAuthed,
    getEntityById,
    getIdFromEntity,
    deleteAuthed,
    putAuthed,
    patchAuthed,
    indexOfEntityById,
    postAuthed
} from "../../core/utils";
import PeopleContext from '../../core/PeopleContext';
import NewWorkerModal from "./workers/NewWorkerModal";
import WorkerModal from './workers/WorkerModal';
import CustomerModal from "./customers/CustomerModal";
import NewCustomerModal from "./customers/NewCustomerModal";
import {mainListItems} from "./listItems";
import Workers from "./workers/Workers";
import Customers from "./customers/Customers";
import withResizeAware from '../../core/withResizeAware';

export const dashboardRoot = "/dashboard";
export const workersPath = `${dashboardRoot}/workers`;
export const customersPath = `${dashboardRoot}/customers`;

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: 0,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class Dashboard extends Component {

    state = {
        people: [],
        open: false,
    };


    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    async componentDidMount() {

        try {
            await this.getPeopleFromApiAndPutToState();
        } catch (e) {
            console.error(e);
            // logout();
        }

    }

    getPeopleFromApi = async () => {
        try {
            let people = await getAuthed("/api/users/search/findAllByOrderByRatingDesc");
            people = people._embedded.users;
            return people;
        } catch (e) {
            // logout();
            console.error(e);
            return [];
        }

    };

    getPeopleFromApiAndPutToState = async () => {
        try {
            let people = await this.getPeopleFromApi();
            this.setState({people});
        } catch (e) {
            // logout();
            console.error(e);
        }

    };

    handleDeletePerson = async (id) => {
        try {
            // console.log(person);
            await deleteAuthed("/api/users/" + id);
            await this.getPeopleFromApiAndPutToState();
        } catch (e) {
            // logout();
            console.error(e);
        }


    };

    handleUpdatePerson = async (id, personData) => {
        try {
            let people = this.state.people;

            let updatedPerson = await patchAuthed("/api/users/" + id, personData);

            // find the index of the worker obj in the array
            let index = indexOfEntityById(people, id);
            // replace with new one
            people[index] = updatedPerson;

            this.setState({people});
        } catch (e) {
            // logout();
            console.error(e);
        }

    };

    handleCreatePerson = async (personData) => {
        try {
            let res = await postAuthed("/api/users/", personData);
            await this.getPeopleFromApiAndPutToState();
        } catch (e) {
            // logout();
            console.error(e);
        }

    };

    getPersonById = (id) => {
        let person = getEntityById(this.state.people, id);
        return person;
    };

    render() {
        const {classes, match} = this.props;

        return (
            <PeopleContext.Provider value={{
                people: this.state.people,
                handleDeletePerson: this.handleDeletePerson,
                handleUpdatePerson: this.handleUpdatePerson,
                handleCreatePerson: this.handleCreatePerson,
                getPersonById: this.getPersonById
            }}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Dashboard
                            </Typography>
                            <IconButton color="inherit" onClick={() => {
                                logout();
                            }}>
                                Log out
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{mainListItems(
                            () => this.props.history.push(workersPath),
                            () => this.props.history.push(customersPath)
                        )}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <Route exact path={dashboardRoot} render={() => {
                            return <Redirect to={workersPath}/>
                        }} />
                        <Route path={workersPath} component={Workers}/>
                        <Route path={customersPath} component={Customers}/>
                    </main>
                </div>
                {this.props.width < 600 && <Route path={`${workersPath}/:id([0-9]+)`} exact component={WorkerModal}/>}
                {this.props.width < 600 && <Route path={`${workersPath}/new`} exact component={NewWorkerModal}/>}
                {this.props.width < 600 && <Route path={`${customersPath}/:id([0-9]+)`} exact component={CustomerModal}/>}
                {this.props.width < 600 && <Route path={`${customersPath}/new`} exact component={NewCustomerModal}/>}
            </PeopleContext.Provider>
        )
    }
}


export default withResizeAware(withStyles(styles)(Dashboard), 100);