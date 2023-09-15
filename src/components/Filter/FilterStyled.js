import styled from 'styled-components';

export const FilterStyled = styled.label`
  margin-top: 20px;
  display: flex;

  flex-direction: column;

  input {
    width: 300px;
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 10px;

    outline: none;
    cursor: pointer;
    transition: border-color cubic-bezier(0.4, 0, 0.2, 1) 250ms;
    &:focus,
    &:hover {
      border-color: #2196f3;
    }
  }
`;
