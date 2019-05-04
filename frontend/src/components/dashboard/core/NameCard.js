import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        marginBottom: 12,

    },
    pos: {
        marginBottom: 12,
    },
};

function NameCard(props) {
    const {classes, person} = props;
    let {firstName, lastName, phone} = person;

    return (
        <Card className={classes.card} onClick={props.onClick}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {firstName} {lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {phone}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(NameCard);
