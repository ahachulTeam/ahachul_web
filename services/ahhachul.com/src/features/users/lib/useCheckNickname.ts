import { AxiosError } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Subject,
  catchError,
  debounceTime,
  filter,
  from,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { UserQuery } from '..';

const MIN_LEN = 2;
const MAX_LEN = 10;

interface Props {
  nickname: string;
  originNickname?: string;
}

export const useCheckNickname = ({ nickname, originNickname = '' }: Props) => {
  const subject = useRef(new Subject<string>());
  const { mutateAsync, status } = UserQuery.useCheckNickName();

  const [errorMessage, setErrorMessage] = useState('');
  const disabled = useMemo(() => {
    if (errorMessage !== '') return true;
    if (status === 'pending') return true;
    if (nickname.length < MIN_LEN || nickname.length > MAX_LEN) return true;

    return false;
  }, [nickname, errorMessage, status]);

  useEffect(() => {
    subject.current
      .pipe(
        debounceTime(500),
        filter((v) => v !== originNickname),
        map((v) => {
          if (v.length > MAX_LEN) {
            setErrorMessage('한글,영문 10자 이하로 입력해주세요');
            return '';
          } else if (v.length === 1) {
            setErrorMessage('최소 2자 이상 입력해주세요');
            return '';
          } else {
            setErrorMessage('');
            return v;
          }
        }),
        filter((v) => v !== ''),
        mergeMap((v) =>
          from(mutateAsync({ nickname: v })).pipe(catchError((e) => of(e))),
        ),
        map((d) => {
          if (d instanceof AxiosError) {
            return '지원하지 않는 형식입니다';
          }
          return d.data.payload ? '중복인 닉네임이라 사용할 수 없습니다.' : '';
        }),
      )
      .subscribe((v: string) => {
        setErrorMessage(v);
      });

    return () => subject.current?.unsubscribe();
  }, []);

  useEffect(() => {
    subject.current.next(nickname);
  }, [nickname]);

  return { errorMessage, disabled };
};
