import SecondaryHeading from '../UI/SecondaryHeading';

import classes from './UserDetails.module.css';

const UserDetails = ({ name, group, variant, phoneNumber }) => {
  return (
    <>
      <SecondaryHeading>User Details</SecondaryHeading>

      <div className={classes.user}>
        <p>Name: {name}</p>
        <p>Group: {group}</p>
        <p>Variant: {variant}</p>
        <p>Tel: {phoneNumber}</p>
      </div>
    </>
  );
};

export default UserDetails;
