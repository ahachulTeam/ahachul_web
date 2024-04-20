import { Layout } from '@/src/components/layout';
import { PATH } from '@/src/data';
import useNickname from '@/src/hooks/useNickname';
import { usePutPersonalInfo } from '@/src/queries/member';
import IconInfo from '@/src/static/icons/system/IconInfo';
import { f } from '@/src/styles';
import { CSSObject, Theme } from '@emotion/react';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

export default function MeNicknameSetting() {
  const router = useRouter();
  const [nickname, setNickName] = useState('');

  const { disabled: nicknameDisabled, inputRef, invalidMsg, available } = useNickname({ nickname });

  const { mutate, status } = usePutPersonalInfo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nicknameDisabled || !available) {
      inputRef.current?.focus?.();
      return;
    }

    mutate({
      nickname,
    });
  };

  useEffect(() => {
    if (status === 'success') {
      router.replace(PATH.settingStations);
    }
  }, [status]);

  return (
    <Layout headerType="back" title="" nav={false}>
      <form css={wrap} onSubmit={handleSubmit}>
        <div css={section}>
          <span>닉네임 설정</span>
          <input
            ref={inputRef}
            id="title"
            placeholder="닉네임"
            aria-invalid={!!invalidMsg}
            onChange={(e) => setNickName(e.target.value)}
          />
          {invalidMsg && (
            <b>
              <IconInfo /> {invalidMsg}
            </b>
          )}
        </div>
        <div css={submitWrap}>
          <button css={submitBtn} type="submit" disabled={nicknameDisabled}>
            다음
          </button>
        </div>
      </form>
    </Layout>
  );
}

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 0 120px 0' }];

const section: [CSSObject, CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#ffffff',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },

      '&[aria-invalid="true"]': {
        borderColor: '#E02020',
      },
    },

    '& > b': {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#E02020',
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
      marginTop: '12px',
      gap: '6px',

      '& > div > svg > path': {
        fill: '#E02020',
        stroke: '#ffffff',

        '&:first-of-type': {
          stroke: '#E02020',
        },
      },
    },
  }),
];

const submitWrap: CSSObject[] = [
  f.fullWidth,
  {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#141517',
    padding: '16px 20px 24px',
  },
];

const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  height: '48px',
  background: 'rgb(196, 212, 252)',
  color: '#141517',
  fontWeight: fontWeight[600],
  borderRadius: '8px',

  '&:disabled': {
    color: '#ffffff',
    opacity: 0.75,
  },
});
