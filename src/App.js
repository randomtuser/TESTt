import './App.css';
import Foundries from './Pages/foundries/foundries';
import Printers from './Pages/Printers/printers';
import Crucibles from './Pages/Crucibles/crucibles';
import Overview from './Pages/overview/overview';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FoundriesDashboard } from './Pages/foundriesDashboard/foundriesDashboard';
import Settings from './Pages/settings/settings';
import Support from './Pages/Support/support';
import Notifications from './Pages/Notifications/notifications';
import PostView from './components/common/postView/postView';
import ResetPassword from './Pages/Auth/ForgotPassword';
import AfterRegister from './Pages/Auth/afterRegister/afterRegister';
import Terms from './Pages/Terms/terms';
import QrPlaceholder from './Pages/qrPlaceholder';
import QrResult from './Pages/qrResult';
import ProtectedRoute from './config/protectedRoute';
import { useAuth } from './hooks/auth';
import Privacy from './Pages/Privacy/privacy';
import AfterRegisteruser from './Pages/Auth/AfterRegisterUser/afterRegister';
import { Suspense } from 'react';
import Alloys from './Pages/Alloys/alloys';
import QrInvited from './Pages/qrInvited';
import { NotificationsProvider } from 'reapop';
import { useState } from 'react';
import Notificationsnotify from './components/common/notify/notifications';
import Header from './components/common/header/header';
import Users from './Pages/Users/users';
import SettingsSidebar from './components/common/sidebar/settingsSidebar/settingsSidebar';
import Security from './Pages/security/security';
import Sidebar from './components/common/sidebar/sidebar';
import SignUpuser from './Pages/Auth/SignUpUser/signupuser';
import SignIn from './Pages/Auth/SignIn/signIn';
import SignUp from './Pages/Auth/SignUp/signUp';
import ResetPasswordTest from './Pages/Auth/ForgotPassword/resetPasswordTest';
import SignUpmail from './Pages/Auth/SignUpUser/signupemail';
import NewPassword from './Pages/Auth/NewPassword/newpassword';

export default function App() {
  const { group, user, profile } = useAuth();
  const [pictureProp, setPictureProp] = useState(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const location = useLocation();

  const [fullNameProp, setFullNameProp] = useState('');

  let noSidebarGroup = [
    'signin',
    'signupusermail',
    'newpass',
    'signupuser',
    'signup',
    'resetpasswordtest',
    'afterregister',
    'newpassword',
    'resetpassword',
    'terms',
    'afterregisteruser',
  ];

  let settingSidebarGroup = [
    'settings',
    'security',
    'notifications',
    'users',
    'support',
    'privacy',
  ];

  let nosidebar = false;
  // let locationpath = location.pathname.toLocaleLowerCase().substring(1).replace('/', '');
  let locationpath = location.pathname.toLocaleLowerCase().substring(1).split('/').pop();

  if (
    noSidebarGroup.includes(locationpath) ||
    /^signupuser(\/.*)?$/.test(location.pathname.toLocaleLowerCase().replace('/', ''))
  ) {
    nosidebar = true;
  }

  let settingsidebar = false;

  if (settingSidebarGroup.includes(locationpath)) {
    settingsidebar = true;
  }

  let notifyFunction = () => {};

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const closeSideBar = () => {
    setIsOpenSidebar(false);
  };

  const notify = (notifyFn) => {
    notifyFunction = notifyFn;
  };

  return (
    <>
      <Suspense fallback={null}>
        <div className='flex h-full gap-2 overflow-hidden bg-neutral-200 dark:bg-[#1B1B1B] 3xl:mx-auto 3xl:max-w-[70vw] '>
          {nosidebar === false && (
            <div
              className={`${isOpenSidebar ? 'absolute block lg:relative' : 'hidden'} w-[312px] ${
                !settingsidebar ? 'lg:block' : ''
              } `}
            >
              <Sidebar
                toggleSidebar={() => {
                  toggleSidebar();
                }}
                closeSideBar={closeSideBar}
                isOpenSidebar={isOpenSidebar}
              />
            </div>
          )}

          {settingsidebar === true && (
            <div className='hidden w-[23rem] lg:block '>
              <SettingsSidebar />{' '}
            </div>
          )}

          <div
            className={`w-full ${
              settingsidebar
                ? 'lg:w-[calc(100%-23rem)] '
                : !nosidebar
                ? 'lg:w-[calc(100%-18rem)] 3xl:ml-auto 3xl:w-[54.95vw] 3xl:pl-[1.2vw]'
                : ''
            } `}
          >
            <NotificationsProvider>
              <Notificationsnotify notifyParent={notify} />
              <Header
                toggleSidebar={() => {
                  toggleSidebar();
                }}
                user={user}
                fullName={fullNameProp}
                userPic={pictureProp}
                notify={(a, b) => {
                  notifyFunction(a, b);
                }}
              ></Header>
              <Routes>
                {/* <Route path={process.env.PUBLIC_URL + '/test' element={<TestConn />} /> */}
                <Route
                  path={process.env.PUBLIC_URL + '/signUp'}
                  element={
                    <SignUp
                      user={user}
                      notify={(a, b) => {
                        notifyFunction(a, b);
                      }}
                    />
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/signUpuser/:qr'}
                  element={
                    <SignUpuser
                      user={user}
                      notify={(a, b) => {
                        notifyFunction(a, b);
                      }}
                    />
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/signUpusermail'}
                  element={
                    <ProtectedRoute>
                      <SignUpmail
                        user={user}
                        profile={profile}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/resetpassword'}
                  element={
                    <ResetPassword
                      notify={(a, b) => {
                        notifyFunction(a, b);
                      }}
                    />
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/newpassword'}
                  element={
                    <ProtectedRoute>
                      <NewPassword
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/signin'}
                  element={
                    <SignIn
                      notify={(a, b) => {
                        notifyFunction(a, b);
                      }}
                    />
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/resetpasswordtest'}
                  element={
                    <ResetPasswordTest
                      notify={(a, b) => {
                        notifyFunction(a, b);
                      }}
                    />
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/afterregister'}
                  element={
                    <ProtectedRoute>
                      <AfterRegister
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/afterregisteruser'}
                  element={
                    <ProtectedRoute>
                      <AfterRegisteruser group={group} user={user} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/foundries'}
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Foundries group={group} user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/printers'}
                  element={
                    <ProtectedRoute>
                      <Printers
                        group={group}
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/crucibles'}
                  element={
                    <ProtectedRoute>
                      <Crucibles group={group} user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/settings'}
                  element={
                    <ProtectedRoute>
                      <Settings
                        setFullNameProp={setFullNameProp}
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                        setPictureProp={setPictureProp}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/security'}
                  element={
                    <ProtectedRoute>
                      <Security
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                        setPictureProp={setPictureProp}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/users'}
                  element={
                    <ProtectedRoute>
                      <Users
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/support'}
                  element={
                    <ProtectedRoute>
                      <Support
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/notifications'}
                  element={
                    <ProtectedRoute>
                      <Notifications
                        user={user}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/post/:id'}
                  element={
                    <ProtectedRoute>
                      <PostView />
                    </ProtectedRoute>
                  }
                  exact
                />
                <Route
                  path={process.env.PUBLIC_URL + '/'}
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Overview profile={profile} group={group} />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/terms'}
                  element={
                    <ProtectedRoute>
                      <Terms />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={process.env.PUBLIC_URL + '/alloys'}
                  element={<Alloys group={group} />}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/qr'}
                  element={
                    <ProtectedRoute>
                      <QrPlaceholder
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '/qr/:qr'}
                  element={
                    <ProtectedRoute>
                      <QrResult
                        group={group}
                        notify={(a, b) => {
                          notifyFunction(a, b);
                        }}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path={process.env.PUBLIC_URL + '/invite/:qr'} element={<QrInvited />} />
                <Route
                  path={process.env.PUBLIC_URL + '/Privacy'}
                  element={
                    <ProtectedRoute>
                      <Privacy />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/foundries/dashboard/:id'}
                  element={
                    <ProtectedRoute>
                      <FoundriesDashboard />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={process.env.PUBLIC_URL + '*'}
                  element={
                    <ProtectedRoute>
                      <Navigate to='/' />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </NotificationsProvider>
          </div>
        </div>
      </Suspense>
    </>
  );
}
