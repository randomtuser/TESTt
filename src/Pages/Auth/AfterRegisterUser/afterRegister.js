import Register from '../../../components/afterRegisterUserPage/index';
import React from 'react';

function AfterRegisteruser(props) {
  const user = props.user;
  const group = props.group;
  return <Register user={user} group={group} />;
}

export default AfterRegisteruser;
