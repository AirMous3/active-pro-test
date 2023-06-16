import styled from 'styled-components';

export const Button = styled.button`
  border: 0.2px solid #42cfee;
  background: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;

  &:active {
    transform: scale(0.95);
  }
`;
