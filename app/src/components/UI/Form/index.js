import classes from './Form.module.css';

const Label = (props) => {
  return (
    <label className={classes.form__label} {...props}>
      {props.children}
    </label>
  );
};

const Input = (props) => {
  return <input className={classes.form__input} {...props} />;
};

const Group = ({ children }) => (
  <div className={classes.form__group}>{children}</div>
);

const Submit = (props) => (
  <button className={classes.form__submit} {...props}>
    {props.children}
  </button>
);

const Form = (props) => {
  return <form {...props}>{props.children}</form>;
};

Form.Group = Group;
Form.Label = Label;
Form.Input = Input;
Form.Submit = Submit;

export default Form;
