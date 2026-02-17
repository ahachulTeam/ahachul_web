import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Subject, catchError, debounceTime, filter, from, map, mergeMap, of } from 'rxjs';

import { API_PATHS } from '@ahhachul/http';
import { normalizeInputText, validateNickname } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';

interface Props {
  nickname: string;
  originNickname?: string;
}

interface APICheckNicknameParams {
  nickname: string;
}

const checkNickname = (body: APICheckNicknameParams) =>
  axiosInstance.post(API_PATHS.user.checkNickname, body);
export const useCheckNickName = () => useMutation({ mutationFn: checkNickname });

export const useCheckNickname = ({ nickname, originNickname = '' }: Props) => {
  const subject = useRef(new Subject<string>());
  const { mutateAsync, status } = useCheckNickName();

  const [errorMessage, setErrorMessage] = useState('');
  const nicknameValidation = useMemo(() => validateNickname(nickname), [nickname]);
  const disabled = useMemo(() => {
    if (errorMessage !== '') return true;
    if (status === 'pending') return true;
    if (!nicknameValidation.isValid) return true;

    return false;
  }, [errorMessage, nicknameValidation.isValid, status]);

  useEffect(() => {
    subject.current
      .pipe(
        debounceTime(500),
        filter(v => normalizeInputText(v) !== normalizeInputText(originNickname)),
        map(v => {
          const validation = validateNickname(v);
          if (validation.code === 'empty') {
            setErrorMessage('');
            return '';
          }

          if (!validation.isValid) {
            setErrorMessage(validation.message);
            return '';
          }

          setErrorMessage('');
          return validation.normalized;
        }),
        filter(v => v !== ''),
        mergeMap(v => from(mutateAsync({ nickname: v })).pipe(catchError(e => of(e)))),
        map(d => {
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
  }, [mutateAsync, originNickname]);

  useEffect(() => {
    subject.current.next(nickname);
  }, [nickname]);

  return { errorMessage, disabled };
};
