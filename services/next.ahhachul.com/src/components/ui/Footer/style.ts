import { css } from '@emotion/react';

const wrap = css`
  width: 100%;
  padding: 31px 24px;
  background-color: #141517;

  .ahhachul-biz-title {
    width: 100%;
    font-family: Regular;
    font-size: 0.87rem;
    color: #4c5874;
    letter-spacing: -0.02rem;
  }

  .ahhachul-biz-toogle {
    margin-top: 14px;
    overflow: hidden;
    font-family: Regular;
    font-size: 0.68rem;
    line-height: 20px;
    letter-spacing: -0.03px;
    color: #4c5874;
  }

  .ahhachul-biz-toogle .link {
    margin-left: 6px;
    border-bottom: 1px solid var(--color-black);
  }

  .ahhachul-biz-toogle .bold {
    margin-right: 3px;
    font-family: Bold;
  }

  .ahhachul-biz-toogle .gray {
    margin: 0px 3px;
    color: #c9c9c9;
  }

  .ahhachul-info-down-img {
    width: 19px;
    margin-bottom: -4px;
    margin-left: 4px;
    transform: rotate(0deg);
  }

  .ahhachul-info-down-img.rotate {
    transform: rotate(180deg);
  }

  .ahhachul-biz-sub-title-wrap {
    width: 100%;
    margin-top: 10px;
  }

  .ahhachul-biz-sub-title {
    display: inline-block;
    font-family: Regular;
    font-size: 0.87rem;
    color: #4c5874;
    letter-spacing: -0.02rem;
    margin-right: 12px;
  }

  .ahhachul-social-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .ahhachul-social-img {
    width: 34px;
    height: auto;
    margin-right: 8px;
  }

  .ahhachul-info-ctnt-wrap {
    width: 100%;
    margin-top: 20px;
  }

  .ahhachul-info-ctnt {
    font-family: Regular;
    font-size: 0.68rem;
    color: #949db2;
    letter-spacing: -0.02rem;
    line-height: 1.12rem;
  }

  .ahhachul-info-logo-wrap {
    width: 100%;
    margin-top: 30px;
  }

  .ahhachul-info-logo-img {
    display: block;
    width: 87px;
    height: auto;
  }

  .ahhachul-info-logo-ctnt {
    font-family: Regular;
    font-size: 0.75rem;
    color: #4c5874;
    margin-top: 6px;
  }
`;

export { wrap };
