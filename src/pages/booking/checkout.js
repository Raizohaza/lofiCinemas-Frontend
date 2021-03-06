import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './address';
import PaymentForm from './Payment';
import Review from './review';
import api from 'api';
import { useSelector } from 'react-redux';
import Barcode from 'react-barcode';
function Copyright() {
  return (
    <Typography variant="body2">
      {'Click '}
      <Link color="inherit" href="/">
        Here
      </Link>{' to go home '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Booking detail', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const prepareBookingData = useSelector((state) => state.booking.prepareData);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const [bookingId,setBookingId] = React.useState("");
  return (
    <React.Fragment>

      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Barcode value={bookingId}/>
                <Copyright />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ?
                  <Button 
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={()=>{
                    // console.log('bookingData',prepareBookingData);
                    api.post('/booking/add',{...prepareBookingData}).then(
                      res=>{
                          console.log(res);
                          let dataBookingShowTime = new Date(res.data.booking.DateTime);
                          setBookingId(res.data.booking.id+dataBookingShowTime.getTime());
                          handleNext();
                      }
                    ).catch(
                        err=>{
                            console.log(err);
                            handleNext();
                        }
                    );
                  }
                  
              }
              
              >
                {'place order'}
              </Button>:
              <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {'Next'}
            </Button>
              }
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
    </React.Fragment>
    
  );
}