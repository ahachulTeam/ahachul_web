import { AxiosError } from 'axios';
import { MemberQuery } from 'queries';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Subject, catchError, debounceTime, filter, from, map, mergeMap, of } from 'rxjs';

const MAX_LEN = 10;
const MIN_LEN = 2;

interface Props {
  nickname: string;
  originNickname?: string;
}

function useCheckNickname({ nickname, originNickname = '' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isLoading } = MemberQuery.useCheckNickname();
  const subjectRef = useRef(new Subject<string>());

  const [invalidMsg, setInvalidMsg] = useState('');

  const disabled = useMemo(() => {
    if (invalidMsg !== '') return true;
    if (isLoading) return true;
    if (nickname.length < MIN_LEN || nickname.length > MAX_LEN) return true;

    return false;
  }, [nickname, invalidMsg, isLoading]);

  useEffect(() => {
    subjectRef.current
      .pipe(
        debounceTime(500),
        filter((v) => v !== originNickname),
        map((v) => {
          if (v.length > MAX_LEN) {
            setInvalidMsg('한글,영문 10자 이하로 입력해주세요');
            return '';
          } else if (v.length === 1) {
            setInvalidMsg('최소 2자 이상 입력해주세요');
            return '';
          } else {
            setInvalidMsg('');
            return v;
          }
        }),
        filter((v) => v !== ''),
        mergeMap((v) => from(mutateAsync(v)).pipe(catchError((e) => of(e)))),
        map((d) => {
          if (d instanceof AxiosError) {
            return '지원하지 않는 형식입니다';
          }
          return d.data.payload ? '중복인 닉네임이라 사용할 수 없습니다.' : '';
        }),
      )
      .subscribe((v: string) => {
        setInvalidMsg(v);
      });

    return () => subjectRef.current?.unsubscribe();
  }, []);

  useEffect(() => {
    subjectRef.current.next(nickname);
  }, [nickname]);

  return { invalidMsg, disabled, inputRef };
}

export default useCheckNickname;
