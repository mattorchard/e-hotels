import React from "react";

const PaymentFields = props => {
  return <>
    <label>
      Credit Card Number
      <input type="number" min="11111111111111111" max="99999999999999999"/>
    </label>
    <label>
      CVV
      <input type="number" min="0" max="999" minLength="2"/>
    </label>
    <label>
      Expiration Month:
      <input type="number" min="0" max="12" minLength="2"/>
    </label>
    <label>
      Expiration Year:
      <input type="number" min="19" max="99"/>
    </label>
    <label>
      Name on Card
      <input type="text"/>
    </label>
    <label>
      Postal / ZIP Code
      <input type="text" pattern="(([A-z]\d){3})|(\d{9})"/>
    </label>
  </>
};

export default PaymentFields;