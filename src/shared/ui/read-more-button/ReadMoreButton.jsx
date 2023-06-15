import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 12px;
  color: #808080;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  margin-top: 10px;
`;

export const ReadMoreButton = ({ text }) => {
  const [showMore, setShowMore] = useState(false);
  const [showButton, setShowButton] = useState(text.length >= 200);

  const handleShowMore = () => {
    setShowMore(true);
    setShowButton(false);
  };

  return (
    <>
      {showMore ? text : `${text.substring(0, 150)}`}
      <div>{showButton && <Button onClick={handleShowMore}>Далее</Button>}</div>
    </>
  );
};
