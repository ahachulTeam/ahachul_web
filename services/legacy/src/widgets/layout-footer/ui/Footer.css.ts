import { css } from '@emotion/react';

const wrap = css`
  width: 100%;
  padding: 30px 24px;
  background-color: #141517;

  .biz-title {
    width: 100%;
    color: #4c5874;
    font-size: 0.87rem;
    letter-spacing: -0.02rem;
  }

  .biz-toggle {
    overflow: hidden;
    color: #4c5874;
    font-size: 0.68rem;
    line-height: 20px;
    letter-spacing: -0.03px;
  }

  .biz-toggle .link {
    margin-left: 6px;
  }

  .biz-toggle .bold {
    margin-right: 3px;
    font-weight: 700;
  }

  .biz-toggle .divider {
    margin: 0px 3px;
  }

  .arrow-down-img {
    width: 19px;
    margin-bottom: -4px;
    margin-left: 4px;
    transform: rotate(0deg);
  }

  .arrow-down-img.rotate {
    transform: rotate(180deg);
  }

  .biz-subtitle-wrap {
    width: 100%;
    margin-top: 10px;
  }

  .biz-subtitle {
    display: inline-block;
    font-family: Regular;
    font-size: 0.87rem;
    color: #4c5874;
    letter-spacing: -0.02rem;
    margin-right: 12px;
  }

  .social-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .social-img {
    width: 34px;
    height: auto;
    margin-right: 8px;
  }

  .info-copyright-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .info-copyright {
    font-family: Regular;
    font-size: 0.68rem;
    color: #949db2;
    letter-spacing: -0.02rem;
    line-height: 1.12rem;
  }

  .info-logo-wrap {
    width: 100%;
    margin-top: 30px;
  }

  .info-logo-img {
    display: block;
    width: 87px;
    height: auto;
  }

  .info-logo-copyright {
    font-family: Regular;
    font-size: 0.75rem;
    color: #4c5874;
    margin-top: 6px;
  }
`;

export { wrap };
