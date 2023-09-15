import React from 'react';
import PropTypes from 'prop-types';
import { FormStyled } from './FormStyled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class Form extends React.Component {
  state = { ...INITIAL_STATE };

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handelSubmit = e => {
    const { contacts, onSubmit } = this.props;
    const { name, number } = this.state;
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    onSubmit({ name, number });
    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <FormStyled onSubmit={this.handelSubmit}>
        <label>
          Name
          <input
            onChange={this.handelChange}
            value={this.state.name}
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
            onChange={this.handelChange}
            value={this.state.number}
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
  }
}

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
