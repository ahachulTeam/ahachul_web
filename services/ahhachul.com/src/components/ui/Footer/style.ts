import { css } from '@emotion/react';

const wrap = css`
  width: 100%;
  padding: 31px 24px;

  .redblue-biz-title {
    width: 100%;
    font-family: Regular;
    font-size: 0.87rem;
    color: #4c5874;
    letter-spacing: -0.02rem;
  }

  .redblue-biz-toogle {
    margin-top: 14px;
    overflow: hidden;
    font-family: Regular;
    font-size: 0.68rem;
    line-height: 20px;
    letter-spacing: -0.03px;
    color: #4c5874;
  }

  .redblue-biz-toogle .link {
    margin-left: 6px;
    border-bottom: 1px solid var(--color-black);
  }

  .redblue-biz-toogle .bold {
    margin-right: 3px;
    font-family: Bold;
  }

  .redblue-biz-toogle .gray {
    margin: 0px 3px;
    color: #c9c9c9;
  }

  .redblue-info-down-img {
    width: 19px;
    margin-bottom: -4px;
    margin-left: 4px;
    transform: rotate(0deg);
  }

  .redblue-info-down-img.rotate {
    transform: rotate(180deg);
  }

  .redblue-biz-sub-title-wrap {
    width: 100%;
    margin-top: 10px;
  }

  .redblue-biz-sub-title {
    display: inline-block;
    font-family: Regular;
    font-size: 0.87rem;
    color: #4c5874;
    letter-spacing: -0.02rem;
    margin-right: 12px;
  }

  .redblue-social-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .redblue-social-img {
    width: 34px;
    height: auto;
    margin-right: 8px;
  }

  .redblue-info-ctnt-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .redblue-info-ctnt {
    font-family: Regular;
    font-size: 0.68rem;
    color: #949db2;
    letter-spacing: -0.02rem;
    line-height: 1.12rem;
  }

  .redblue-info-logo-wrap {
    width: 100%;
    margin-top: 30px;
  }

  .redblue-info-logo-img {
    display: block;
    width: 87px;
    height: auto;
  }

  .redblue-info-logo-ctnt {
    font-family: Regular;
    font-size: 0.75rem;
    color: #4c5874;
    margin-top: 6px;
  }
`;

export { wrap };
