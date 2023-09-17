import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const TEST_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const LS_KEY = 'savedContacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? TEST_CONTACTS
  );

  const [filter, setFilter] = useState('');

  const handelSubmit = ({ name, number }) => {
    const id = nanoid();
    setContacts(prevContacts => [...prevContacts, { id, name, number }]);

    Notify.success(`Contact ${name} added successfully`);
  };

  const handelDelete = id => {
    setContacts(prevContacts => {
      const newContacts = prevContacts.filter(contact => contact.id !== id);
      Notify.success(`Contact deleted successfully`);
      return newContacts;
    });
  };

  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handelChange = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    } catch (err) {
      console.error('Set state error: ', err.message);
    }
  }, [contacts]);

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
      <Form onSubmit={handelSubmit} contacts={contacts} />
      {!!contacts.length && <Filter onChange={handelChange} filter={filter} />}
      {!!contacts.length && <h2>Contacts</h2>}
      <ContactList contacts={filteredContacts()} onDelete={handelDelete} />
    </div>
  );
};
