import React, { useCallback, useState } from 'react';

import down from 'static/img/ahhachul_info_down.png';
import kakao from 'static/img/ahhachul_info_kakao.png';
import naver from 'static/img/icon_naver.png';
import facebook from 'static/img/ahhachul_info_facebook.png';
import insta from 'static/img/ahhachul_info_insta.png';
import youtube from 'static/img/icon_youtube.png';
import ahhachulLogo from 'static/img/logo.png';
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
      <div className="ahhachul-biz-title" onClick={clickFold}>
        (주) 아하철 사업자 정보
        <img className={'ahhachul-info-down-img' + (open ? ' rotate' : '')} src={down} />
      </div>
      <div className="ahhachul-biz-toogle-wrap">
        <div className="ahhachul-biz-toogle" style={style}>
          <div>
            <span className="bold">사업자 등록번호</span> 123-45-67890 <span className="gray">|</span>
            <span className="bold">대표이사</span> 이효범
          </div>
          <div>
            <span className="bold">통신판매사업 신고번호</span> 2024-서울서초-1234
            <span
              className="link"
              onClick={openLink(
                'https://www.figma.com/file/rCbAJX4i99cofVLViMkmJT/%EC%A7%80%ED%95%98%EC%B2%A0-APP-%EB%94%94%EC%9E%90%EC%9D%B8?type=design&mode=design&t=TqyACekyO7yQBWIR-0',
              )}
            >
              사업자정보확인
            </span>
          </div>
          <div>
            <span className="bold">주소</span> 경기 의정부시 녹양로34번길 47 106동
          </div>
        </div>
      </div>
      <div className="ahhachul-biz-sub-title-wrap">
        <div className="ahhachul-biz-sub-title" onClick={openLink('https://naver.com')}>
          회사소개
        </div>
        <div className="ahhachul-biz-sub-title" onClick={openLink('https://google.com')}>
          개인정보처리방침
        </div>
        <div className="ahhachul-biz-sub-title" onClick={openLink('https://github.com/')}>
          서비스 이용약관
        </div>
      </div>
      <div className="ahhachul-social-wrap">
        <img className="ahhachul-social-img" src={kakao} onClick={openLink('https://www.kakaocorp.com/page/')} />
        <img className="ahhachul-social-img" src={naver} onClick={openLink('https://naver.com')} />
        <img className="ahhachul-social-img" src={facebook} onClick={openLink('https://www.facebook.com')} />
        <img className="ahhachul-social-img" src={insta} onClick={openLink('https://www.instagram.com/createhb21/')} />
        <img
          className="ahhachul-social-img"
          src={youtube}
          onClick={openLink('https://www.youtube.com/channel/UC9Cw6MssMWLLLW7jBzgUA5Q')}
        />
      </div>
      <div className="ahhachul-info-ctnt-wrap">
        <div className="ahhachul-info-ctnt">
          판매되는 이용권의 경우 (주) 아하철은 통신판매의 당사자가 아닌 통신판매중개자로서, 상품, 상품정보, 거래에 대한
          책임이 제한될 수 있으므로, 각 이용권 페이지에서 구체적인 내용은 확인하시기 바랍니다.
        </div>
        <div className="ahhachul-info-ctnt" style={{ marginTop: '10px' }}>
          본 사이트 및 앱내의 상품/판매자/센터/이용권/강사 정보, 콘텐츠, UI 등에 대한 무단 복제, 전송, 배포, 스크래핑
          등의 행위는 저작권법, 콘텐츠사업 진흥법 등에 의하여 엄격히 금지됩니다.
        </div>
      </div>
      <div className="ahhachul-info-logo-wrap">
        <img className="ahhachul-info-logo-img" src={ahhachulLogo} />
        <div className="ahhachul-info-logo-ctnt">Ahhachul Inc. © 2024 All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
