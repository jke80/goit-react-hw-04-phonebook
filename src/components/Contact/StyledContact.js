import { styled } from 'styled-components';

export const StyledContact = styled.li`
  display: flex;
  justify-content: space-between;
  border: 1px solid #aaa;
  border-radius: 10px;
  min-width: 300px;
  padding: 5px;
  div {
    flex-grow: 1;
    div {
      display: flex;
      align-items: baseline;
    }
  }

  p {
    margin: 0;
  }
  span {
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
  }

  button {
    align-self: flex-end;
    max-width: fit-content;
    padding: 5px;
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
