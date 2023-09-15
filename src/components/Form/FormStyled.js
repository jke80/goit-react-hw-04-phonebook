import styled from 'styled-components';

export const FormStyled = styled.form`
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 300px;

  label {
    padding: 10px 0;
    display: flex;
    gap: 10px;
    align-items: baseline;
  }
  input {
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    outline: none;
    cursor: pointer;
    transition: border-color cubic-bezier(0.4, 0, 0.2, 1) 250ms;
    &:focus,
    &:hover {
      border-color: #2196f3;
    }
  }

  button {
    padding: 10px;
    border: 1px solid #aaa;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 250ms;
    &:focus,
    &:hover {
      background-color: #2196f3;
    }
  }
`;
