import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    align: 'center'
  },
  media: {
    height: 140,
  },
});

export default function Verify() {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Check your email to verify
          </Typography>
          <Link href ="https://mail.google.com">
              Here
          </Link>
        </CardContent>
        <Link href="mail.google.com"/>
      </CardActionArea>
    </Card>
  );
}