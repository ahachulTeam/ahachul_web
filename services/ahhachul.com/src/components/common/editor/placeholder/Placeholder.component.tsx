import * as S from './Placeholder.styled';

interface PlaceholderProps {
  placeholder?: string;
}

const Placeholder = ({ placeholder = '게시글 내용을 작성해 주세요.' }: PlaceholderProps) => (
  <S.Pre>{placeholder}</S.Pre>
);

export default Placeholder;
