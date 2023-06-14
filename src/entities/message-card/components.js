import styled from 'styled-components';

import image from '@/shared/assets/icons/profile-image.svg';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 1px;
  margin-top: 10px;
  min-height: 120px;
  padding: 10px;
`;

export const MessageHeader = styled.div`
  display: flex;
`;

export const AuthorImage = styled.div`
  width: 36px;
  height: 36px;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: 36px 36px;
`;

export const AuthorInfoWrapper = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #808080;
  margin-left: 10px;
`;

export const AuthorTitle = styled.div``;

export const AuthorSubTitle = styled.div``;

export const MessageWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;
export const MessageTime = styled.div`
  font-size: 14px;
  line-height: 9px;
  color: #808080;
`;

export const MessageContent = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.035em;
  color: #333333;
  max-width: 720px;
`;

export const MessageContentWrapper = styled.div`
  margin-left: 10px;
`;

export const MessageFooter = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`;

export const MessageImage = styled.img`
  max-width: 146px;
  user-select: none;
`;
