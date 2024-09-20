import React, { useReducer } from 'react';

import arrowDown from 'shared/static/images/arrow_down.png';
import kakao from '../static/images/footer_kakao.png';
import naver from '../static/images/footer_naver.png';
import facebook from '../static/images/footer_facebook.png';
import insta from '../static/images/footer_insta.png';
import youtube from '../static/images/footer_youtube.png';
import ahhachulLogo from '../static/images/footer_logo.png';
import * as styles from './Footer.css';

export const Footer = () => {
  const [fold, toggle] = useReducer(
    (state) => ({
      ...state,
      open: !state.open,
      css: state.open
        ? { height: '0px', margin: '0px' }
        : { height: 'auto', margin: '0px' },
    }),
    { open: false, css: { height: '0px', margin: '0px' } },
  );

  return (
    <section css={styles.wrap}>
      <div className="biz-title" onClick={toggle}>
        (주) 아하철 사업자 정보
        <img
          className={'arrow-down-img' + (fold.open ? ' rotate' : '')}
          src={arrowDown}
        />
      </div>
      <div className="biz-toggle-wrap">
        <div className="biz-toggle" css={fold.css}>
          <div>
            <span className="bold">사업자 등록번호</span> 123-45-67890{' '}
            <span className="divider">|</span>
            <span className="bold">대표이사</span> 이효범
          </div>
          <div>
            <span className="bold">통신판매사업 신고번호</span>{' '}
            2024-서울서초-1234
            <span className="link">사업자정보확인</span>
          </div>
          <div>
            <span className="bold">주소</span> 경기 의정부시 녹양로34번길 47
          </div>
        </div>
      </div>
      <div className="biz-subtitle-wrap">
        <div className="biz-subtitle">회사소개</div>
        <div className="biz-subtitle">개인정보처리방침</div>
        <div className="biz-subtitle">서비스 이용약관</div>
      </div>
      <div className="social-wrap">
        <img className="social-img" src={kakao} />
        <img className="social-img" src={naver} />
        <img className="social-img" src={facebook} />
        <img className="social-img" src={insta} />
        <img className="social-img" src={youtube} />
      </div>
      <div className="info-copyright-wrap">
        <div className="info-copyright">
          판매되는 이용권의 경우 (주) 아하철은 통신판매의 당사자가 아닌
          통신판매중개자로서, 상품, 상품정보, 거래에 대한 책임이 제한될 수
          있으므로, 각 이용권 페이지에서 구체적인 내용은 확인하시기 바랍니다.
        </div>
        <div className="info-copyright" style={{ marginTop: '10px' }}>
          본 사이트 및 앱내의 상품/판매자 정보, 콘텐츠, UI 등에 대한 무단 복제,
          전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠사업 진흥법 등에
          의하여 엄격히 금지됩니다.
        </div>
      </div>
      <div className="info-logo-wrap">
        <img className="info-logo-img" src={ahhachulLogo} />
        <div className="info-logo-copyright">
          Ahhachul Inc. © 2024 All rights reserved.
        </div>
      </div>
    </section>
  );
};
