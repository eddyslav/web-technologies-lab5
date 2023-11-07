import { useState } from 'react';

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserDetails from './components/UserDetails';

import classes from './App.module.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);

  const handleLogin = (userData) => setUser(userData);

  return (
    <div className={classes.container}>
      <ReactNotifications />

      {user ? (
        <UserDetails {...user} />
      ) : (
        <>
          {isLoginFormSelected ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegister={handleLogin} />
          )}
          <button
            className={classes['cta-button']}
            onClick={() => setIsLoginFormSelected((prev) => !prev)}
          >
            Or {isLoginFormSelected ? 'sign-up' : 'login'} instead
          </button>
        </>
      )}
    </div>
  );
};

export default App;
