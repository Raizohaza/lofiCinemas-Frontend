import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { PayPalButton } from "react-paypal-button-v2";
import PaymentIcon from 'react-payment-icons';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function PaymentForm() {
  const [value, setValue] = React.useState('visa');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormControl component="fieldset" >
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="visa" label="visa" control={<Radio />}>
 
        </FormControlLabel>
        <PaymentIcon
            id="visa"
            style={{ margin: 10, width: 60 }}
            className="payment-icon"
          />
        <FormControlLabel value="visa_electron" label="visa_electron" control={<Radio/>}>
          </FormControlLabel>
          <Grid item xs={12} sm={6}>
          <PaymentIcon
            id="visa_electron"
            style={{ margin: 10, width: 60 }}
            className="payment-icon"
          />
          </Grid>

          <FormControlLabel value="mastercard" label="mastercard" control={<Radio />}>
          </FormControlLabel>

          <Grid item xs={12} sm={6}>
          <PaymentIcon
            id="mastercard"
            style={{ margin: 10, width: 60 }}
            className="payment-icon"
          />
          </Grid>

          </RadioGroup>
          </FormControl>
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderId: data.orderID
              })
            });
          }}
          options={{
            clientId: "AYwVOEqRJRrnv9NtzOquVA6LcbVsZ_ofukkWyfS_uwqyb4DwC5EviNhiTyMkV7r_ElCuPUwkqZoQxN3g"
          }}
        />
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
    </>
  );
}