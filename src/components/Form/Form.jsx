import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormStyled } from './FormStyled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const Form = ({ onSubmit, contacts }) => {
  const [state, setState] = useState(INITIAL_STATE);

  // state = { ...INITIAL_STATE };

  const handelChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handelSubmit = e => {
    // const { contacts, onSubmit } = this.props;
    const { name, number } = state;
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    onSubmit({ name, number });
    setState(INITIAL_STATE);
  };

  return (
    <FormStyled onSubmit={handelSubmit}>
      <label>
        Name
        <input
          onChange={handelChange}
          value={state.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          onChange={handelChange}
          value={state.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </FormStyled>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
