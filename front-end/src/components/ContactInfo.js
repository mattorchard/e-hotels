import React from "react";
import ExpandingList from "./ExpandingList";

const formatPhoneNumber = number => {
  const digits = (number + "");
  const area = digits.slice(0, 3);
  const city = digits.slice(3, 6);
  const user = digits.slice(6, 10);
  return `(${area}) ${city}-${user}`;
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