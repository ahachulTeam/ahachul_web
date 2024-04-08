import useCheckNickname from './useCheckNickname';

interface Props {
  nickname: string;
  handleNext: () => void;
}

function useNickname({ nickname, handleNext }: Props) {
  const { disabled: nicknameDisabled, inputRef, invalidMsg } = useCheckNickname({ nickname });

  const next = () => {
    if (nicknameDisabled) {
      inputRef.current?.focus?.();
      return;
    }

    handleNext();
  };

  return { next, inputRef, invalidMsg, disabled: nicknameDisabled };
}

export default useNickname;
