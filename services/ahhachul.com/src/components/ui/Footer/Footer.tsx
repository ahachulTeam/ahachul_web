import React, { useCallback, useState } from 'react';

import down from 'static/img/redblue_info_down.png';
import kakao from 'static/img/redlue_info_kakao.png';
import naver from 'static/img/icon_naver.png';
import facebook from 'static/img/redlue_info_facebook.png';
import insta from 'static/img/redlue_info_insta.png';
import youtube from 'static/img/icon_youtube.png';
import bodycodiLogo from 'static/img/logo.png';
import { wrap } from './style';

function Footer() {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({
    height: '0px',
    margin: '0px',
  });

  const clickFold = useCallback(() => {
    if (open) {
      setStyle({ height: '0px', margin: '0px' });
    } else {
      setStyle({ height: 'auto', margin: '0px' });
    }
    setOpen(!open);
  }, [open]);

  const openLink = (link: string) => () => window.open(link, '_blank');

  return (
    <footer css={wrap}>
      <div className="redblue-biz-title" onClick={clickFold}>
        (주) 레드블루 사업자 정보
        <img className={'redblue-info-down-img' + (open ? ' rotate' : '')} src={down} />
      </div>
      <div className="redblue-biz-toogle-wrap">
        <div className="redblue-biz-toogle" style={style}>
          <div>
            <span className="bold">사업자 등록번호</span> 844-86-00156 <span className="gray">|</span>{' '}
            <span className="bold">대표이사</span> 이석훈
          </div>
          <div>
            <span className="bold">통신판매사업 신고번호</span> 2021-서울서초-2709{' '}
            <span className="link" onClick={openLink('https://www.ftc.go.kr/bizCommPop.do?wrkr_no=8448600156')}>
              사업자정보확인
            </span>
          </div>
          <div>
            <span className="bold">주소</span> 서울특별시 서초구 반포대로22길 39 하품싱글즈 2층
          </div>
        </div>
      </div>
      <div className="redblue-biz-sub-title-wrap">
        <div className="redblue-biz-sub-title" onClick={openLink('https://bodycodi.com')}>
          회사소개
        </div>
        <div className="redblue-biz-sub-title" onClick={openLink('https://bodycodi.com/member-privacy-2021.html')}>
          개인정보처리방침
        </div>
        <div className="redblue-biz-sub-title" onClick={openLink('https://bodycodi.com/member-term-2021.html')}>
          서비스 이용약관
        </div>
      </div>
      <div className="redblue-social-wrap">
        <img className="redblue-social-img" src={kakao} onClick={openLink('https://pf.kakao.com/_WaLZC')} />
        <img className="redblue-social-img" src={naver} onClick={openLink('https://blog.naver.com/bodycodi_bms')} />
        <img className="redblue-social-img" src={facebook} onClick={openLink('https://www.facebook.com/bodycodi')} />
        <img
          className="redblue-social-img"
          src={insta}
          onClick={openLink('https://www.instagram.com/bodycodi_official/')}
        />
        <img
          className="redblue-social-img"
          src={youtube}
          onClick={openLink('https://www.youtube.com/channel/UC9DQeXDtFBSQnWc2DA5UI2w')}
        />
      </div>
      <div className="redblue-info-ctnt-wrap">
        <div className="redblue-info-ctnt">
          판매되는 이용권의 경우 (주) 레드블루는 통신판매의 당사자가 아닌 통신판매중개자로서, 상품, 상품정보, 거래에
          대한 책임이 제한될 수 있으므로, 각 이용권 페이지에서 구체적인 내용은 확인하시기 바랍니다.
        </div>
        <div className="redblue-info-ctnt" style={{ marginTop: '10px' }}>
          본 사이트 및 앱내의 상품/판매자/센터/이용권/강사 정보, 콘텐츠, UI 등에 대한 무단 복제, 전송, 배포, 스크래핑
          등의 행위는 저작권법, 콘텐츠사업 진흥법 등에 의하여 엄격히 금지됩니다.
        </div>
      </div>
      <div className="redblue-info-logo-wrap">
        <img className="redblue-info-logo-img" src={bodycodiLogo} />
        <div className="redblue-info-logo-ctnt">Redblue Inc. © 2021 All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
