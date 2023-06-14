import * as S from './components';

export const MessageCard = ({
  author,
  subtitle,
  content,
  attachments,
  date,
}) => {
  const type = attachments[0]?.type;
  const url = attachments[0]?.url;
  const time = new Date(date)
    .toLocaleTimeString('ru')
    .replace(/(.*)\D\d+/, '$1');

  return (
    <S.Container>
      <div>
        <S.MessageHeader>
          <S.AuthorImage />

          <S.AuthorInfoWrapper>
            <S.AuthorTitle>{author}</S.AuthorTitle>
            <S.AuthorSubTitle>{subtitle}</S.AuthorSubTitle>
          </S.AuthorInfoWrapper>
        </S.MessageHeader>

        <S.MessageWrapper>
          <S.MessageTime>
            {time}
          </S.MessageTime>

          <S.MessageContentWrapper>
            <S.MessageContent>{content}</S.MessageContent>

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
