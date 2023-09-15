import PropTypes from 'prop-types';

import { FilterStyled } from './FilterStyled';

export const Filter = ({ onChange, filter }) => {
  return (
    <FilterStyled>
      Find contacts by name
      <input
        onChange={onChange}
        value={filter}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </FilterStyled>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
