import { useState } from 'react';

import { Store } from 'react-notifications-component';

import Form from '../UI/Form';

import { register } from '../../api';

import classes from './RegisterForm.module.css';
import SecondaryHeading from '../UI/SecondaryHeading';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [variant, setVariant] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({
        username,
        name,
        group,
        variant,
        phoneNumber,
        password,
      });

      onRegister(response.data);
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
    <div className={classes['signup-form']}>
      <SecondaryHeading>Create your account!</SecondaryHeading>

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
          <Form.Label htmlFor='name'>Name</Form.Label>

          <Form.Input
            id='name'
            name='name'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='group'>Group</Form.Label>

          <Form.Input
            id='group'
            name='group'
            required
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder='Group'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='variant'>Variant</Form.Label>

          <Form.Input
            id='variant'
            name='variant'
            type='number'
            value={variant}
            required
            onChange={(e) => setVariant(e.target.value)}
            placeholder='Variant'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='phoneNumber'>Phone number</Form.Label>

          <Form.Input
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>

          <Form.Input
            id='password'
            name='password'
            type='password'
            value={password}
            required
            minLength={7}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>

        <Form.Submit>Sign-up</Form.Submit>
      </Form>
    </div>
  );
};

export default RegisterForm;
