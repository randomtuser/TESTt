import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import SecurityUI from '../../components/securityPage/securityUI';
import {
  logInWithPassword,
  updatePassword,
  updatePasswordToProfile,
} from '../../components/securityPage/api/security';
import MobileButton from '../../components/foundriesPage/mobileButton';

export default function Security(props) {
  const { user } = useAuth();
  const [user1, setUser1] = useState({});

  const [passwordField, setPasswordField] = useState();
  const [newPasswordField, setNewPasswordField] = useState();
  const [confirmPasswordField, setConfirmPasswordField] = useState();
  const resetInputs = () => {
    setPasswordField('');
    setNewPasswordField('');
    setConfirmPasswordField('');
  };

  const handleChangePass = async () => {
    let update = [];
    const rgx =
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    if (
      passwordField !== undefined &&
      newPasswordField !== undefined &&
      confirmPasswordField !== undefined
    ) {
      if (rgx.test(newPasswordField)) {
        if (confirmPasswordField !== newPasswordField) {
          props.notify("New password and confirm doesn't match. Please try again later.", 'error');
        } else {
          const { error } = await logInWithPassword(user.email, passwordField);
          if (error) {
            props.notify('Current password is not correct. Please, try again.', 'error');
            return;
          } else {
            const { error: updateError } = await updatePassword(newPasswordField);
            if (updateError) {
              props.notify('Error updating password. Please, try again later.', 'error');
              return;
            } else {
              let { data, error } = await updatePasswordToProfile(update, user1.id);

              props.notify('Password updated successfully', 'success');
              resetInputs();
            }
          }
        }
      } else {
        props.notify(
          "New password doesn't meet the minimum requirements. Please, try again.",
          'error',
        );
      }
    } else {
      props.notify('You must complete all blanks in order to update the information.', 'error');
    }
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };
  return (
    <>
      <div className=''>
        <MobileButton />
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-[96%] flex-wrap rounded-[10px] bg-[#FFFFFF] pb-3 pt-2 dark:bg-[#0D0D0D]  md:mt-7 md:px-5'>
          <div className='flex w-full flex-col '>
            <SecurityUI
              passwordField={passwordField}
              setPasswordField={setPasswordField}
              showPassword1={showPassword1}
              togglePasswordVisibility1={togglePasswordVisibility1}
              newPasswordField={newPasswordField}
              setNewPasswordField={setNewPasswordField}
              showPassword2={showPassword2}
              togglePasswordVisibility2={togglePasswordVisibility2}
              confirmPasswordField={confirmPasswordField}
              setConfirmPasswordField={setConfirmPasswordField}
              showPassword3={showPassword3}
              togglePasswordVisibility3={togglePasswordVisibility3}
              resetInputs={resetInputs}
              handleChangePass={handleChangePass}
            />
          </div>
        </div>
      </div>
    </>
  );
}
