import { useDispatch } from 'react-redux';

import { addOrRemoveToFavorite } from '@/entities';
import { ReadMoreButton, getTime } from '@/shared';

import * as S from './components';

const animation = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export const MessageCard = ({
  attachments,
  date,
  author,
  subtitle,
  content,
  id,
  favorite,
}) => {
  const dispatch = useDispatch();
  const type = attachments[0]?.type;
  const url = attachments[0]?.url;
  const time = getTime(date);

  const handleStar = () => {
    dispatch(addOrRemoveToFavorite({ id }));
  };

  return (
    <S.Container
      initial={animation.hidden}
      whileInView={animation.visible}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div>
        <S.MessageHeader>
          <S.AuthorImage />

          <S.AuthorInfoWrapper>
            <S.AuthorTitle>{author}</S.AuthorTitle>
            <S.AuthorSubTitle>{subtitle}</S.AuthorSubTitle>
          </S.AuthorInfoWrapper>

          <S.Star $isActive={favorite} onClick={handleStar} />
        </S.MessageHeader>

        <S.MessageWrapper>
          <S.MessageTime>{time}</S.MessageTime>

          <S.MessageContentWrapper>
            <S.MessageContent>
              <ReadMoreButton text={content} />
            </S.MessageContent>

            {type === 'video' && (
              <S.MessageVideo controls="controls">
                <source src={url} type="video/mp4" />
              </S.MessageVideo>
            )}

            {type === 'image' && <S.MessageImage src={url} alt="image" />}
          </S.MessageContentWrapper>
        </S.MessageWrapper>
      </div>

      <S.MessageFooter>
        <div>#Новое</div>
        <div>#Эксперт</div>
      </S.MessageFooter>
    </S.Container>
  );
};
