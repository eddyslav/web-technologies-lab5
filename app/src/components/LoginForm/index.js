import { useState } from 'react';

import { Store } from 'react-notifications-component';

import Form from '../UI/Form';
import SecondaryHeading from '../UI/SecondaryHeading';

import { login } from '../../api';

import classes from './LoginForm.module.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        username,
        password,
      });

      onLogin(response.data);
    } catch (error) {
      console.error(error.response);

      if (error.response?.status === 400) {
        error.response.data.messages.map((message) =>
          Store.addNotification({
            type: 'warning',
            title: 'Failed to sign-up',
            message,
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismissable: { click: true },
          })
        );

        return;
      }

      throw error;
    }
  };

  return (
    <div className={classes['login-form']}>
      <SecondaryHeading>Log into your account!</SecondaryHeading>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>

          <Form.Input
            id='username'
            name='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>

          <Form.Input
            name='password'
            type='password'
            value={password}
            required
            minLength={7}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>

        <Form.Submit type='submit'>Login</Form.Submit>
      </Form>
    </div>
  );
};

export default Login;
