const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(cors());
app.use(express.json());

const users = {
  svyat: {
    username: 'svyat',
    name: 'Святослав Владика',
    group: 'ІТ-з01',
    variant: 19,
    phoneNumber: '+380981234567',
    password: 'SomeVeryCool_@Pass!23',
  },
};

const validator = (validators) => {
  return async (req, res, next) => {
    for (let validation of validators) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    return errors.isEmpty()
      ? next()
      : res.status(400).json({
          messages: errors.array().map(({ msg }) => msg),
        });
  };
};

const sensitiveProperties = ['username', 'password'];

const skipSensitiveInformation = (user) => {
  const newUser = { ...user };

  sensitiveProperties.forEach((propertyName) =>
    Reflect.deleteProperty(newUser, propertyName)
  );

  return newUser;
};

app.post(
  '/register',
  validator([
    body('username').trim().notEmpty().withMessage('Username cannot be empty'),
    body('name').trim().notEmpty().withMessage('Name cannot be empty'),
    body('group').trim().notEmpty().withMessage('Group cannot be empty'),
    body('variant')
      .isInt({
        gt: 0,
      })
      .withMessage('Variant must be greater than 0'),
    body('phoneNumber')
      .trim()
      .notEmpty()
      .isMobilePhone()
      .withMessage('Phone number must be a valid phone number'),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({
        min: 7,
      })
      .withMessage('Password must be at least 7 characters long'),
  ]),
  (req, res) => {
    const { username } = req.body;

    if (users[username]) {
      return res.status(400).json({
        messages: ['User with this username already exists'],
      });
    }

    users[username] = req.body;

    res.status(200).json(skipSensitiveInformation(req.body));
  }
);

app.post(
  '/login',
  validator([
    body('username').trim().notEmpty().withMessage('Username cannot be empty'),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({
        min: 7,
      })
      .withMessage('Password must be at least 7 characters long'),
  ]),
  (req, res) => {
    const { username: enteredUsername, password: enteredPassword } = req.body;

    const user = users[enteredUsername];

    if (!user || user.password != enteredPassword) {
      return res.status(400).json({
        messages: ['Username or password does not match'],
      });
    }

    res.status(200).json(skipSensitiveInformation(user));
  }
);

const targetPort = process.env.PORT || 5000;

app.listen(targetPort, () =>
  console.log(`Server is running on ${targetPort} port`)
);
