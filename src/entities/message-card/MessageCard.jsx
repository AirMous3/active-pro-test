import { ReadMoreButton } from '@/shared';

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
}) => {
  const type = attachments[0]?.type;
  const url = attachments[0]?.url;
  const time = new Date(date)
    .toLocaleTimeString('ru')
    .replace(/(.*)\D\d+/, '$1');

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
        </S.MessageHeader>

        <S.MessageWrapper>
          <S.MessageTime>{time}</S.MessageTime>

          <S.MessageContentWrapper>
            <S.MessageContent>
              <ReadMoreButton text={content} />
            </S.MessageContent>

            {type === 'video' && (
              <video width="500" height="300" controls="controls">
                <source src={url} type="video/mp4" />
              </video>
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
