import React from 'react';
// import MuiPhoneNumber from 'material-ui-phone-number'
import PhoneInput from 'react-phone-input-2';
import './style.css';

const Input = (props: any) => {
  return <PhoneInput specialLabel={''} country={'th'} />;
};

const phone = (props: any) => {
  return <Input label={'Mobile Phone'} req={true} helperText={''} error={true} isSelect={false} />;
};

export default phone;
