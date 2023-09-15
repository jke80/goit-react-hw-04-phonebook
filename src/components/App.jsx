import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import React from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const TEST_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const INITIAL_STATE = {
  contacts: [...TEST_CONTACTS],
  filter: '',
};

const LS_KEY = 'savedContacts';
export class App extends React.Component {
  state = { ...INITIAL_STATE };

  handelSubmit = ({ name, number }) => {
    const id = nanoid();
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id, name, number }],
    }));

    Notify.success(`Contact ${name} added successfully`);
  };

  handelDelete = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      Notify.success(`Contact deleted successfully`);
      return { contacts: newContacts };
    });
  };

  filteredContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    try {
      const contacts = JSON.parse(localStorage.getItem(LS_KEY));
      if (contacts) {
        this.setState({ contacts });
      }
    } catch (err) {
      console.error('Get state error: ', err.message);
    }
  }

  componentDidUpdate(_, prevState) {
    try {
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
      }
    } catch (err) {
      console.error('Set state error: ', err.message);
    }
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.handelSubmit} contacts={this.state.contacts} />
        {!!this.state.contacts.length && (
          <Filter onChange={this.handelChange} filter={this.state.filter} />
        )}
        {!!this.state.contacts.length && <h2>Contacts</h2>}
        <ContactList
          contacts={this.filteredContacts()}
          onDelete={this.handelDelete}
        />
      </div>
    );
  }
}
