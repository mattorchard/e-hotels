import React from "react";
import ExpandingList from "./ExpandingList";

const formatPhoneNumber = number => {
  const digits = (number + "");
  const countryCode = digits.slice(0, 1);
  const area = digits.slice(1, 4);
  const city = digits.slice(4, 7);
  const user = digits.slice(7, 10);
  return `+${countryCode} (${area}) ${city}-${user}`;
};


export default class ContactInfo extends React.Component {
  render() {
    const {phoneNumbers, emailAddresses, listClassName, itemClassName} = this.props;
    return <>
      <ul className={listClassName}>
        <ExpandingList collapsible>
          {phoneNumbers.map(number =>
            <li className={itemClassName} key={number}>{formatPhoneNumber(number)}</li>)}
        </ExpandingList>
      </ul>
      <ul className={listClassName}>
        <ExpandingList collapsible>
          {emailAddresses.map(email =>
            <li className={itemClassName} key={email}>{email}</li>)}
        </ExpandingList>
      </ul>
    </>
  }
}