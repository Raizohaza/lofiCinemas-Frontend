import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import api from 'api';
import { useHistory, useLocation } from 'react-router-dom';
import { setUser } from 'features/user/userSlice';
import { useDispatch } from 'react-redux';
import './login.css';

export default function Verify() {
  let dispatch = useDispatch();
  let query = useLocation().search;
  let history = useHistory();
  return (
    <Card className="login" >
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Check your email to verify
          </Typography>
          <Button onClick={()=>{
            api.get('/user/verify'+query).then((res)=>{
              dispatch(setUser(res.data.user));
              if(res.status === 200){
                history.push('/');
              }
            });
          }}>
              Here
          </Button>
        </CardContent>

      </CardActionArea>
    </Card>
  );
}