import React from 'react';

import { wrap } from './style';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Train from './train/Train';
import IconFetch from 'static/icons/system/IconFetch';
import IconInfo from 'static/icons/system/IconInfo';

const Subway = () => {
  return (
    <div css={wrap}>
      <SubwayInfo>
        <ThickBorderArea tabIndex={-1}>
          <StationLabel>건대입구</StationLabel>
          <DirectionLabel>신당 방향</DirectionLabel>
        </ThickBorderArea>
        <ContentArea>
          <TopInfo>
            <b>곧 도착</b>
            <span>성수행</span>
            <button>
              <IconFetch css={{ position: 'relative', top: '1px' }} />
            </button>
          </TopInfo>
          <TrainInfoContainer>
            <TrainInfoTop>
              <span>전동차 5035</span>
              <div>
                <span>여유</span>
                <ul>
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
                <span>혼잡</span>
                <IconInfo css={{ position: 'relative', top: '1px' }} />
              </div>
            </TrainInfoTop>
            <Train />
          </TrainInfoContainer>
          <BottomInfo>
            <li>
              <b css={{ fontWeight: '700 !important' }}>성수행</b>
              <span>곧 도착</span>
            </li>
            <li>
              <b>성수행</b>
              <span>2분 26초</span>
            </li>
            <li>
              <b>성수행</b>
              <span>10분 28초</span>
            </li>
            <li>
              <b>성수행</b>
              <span>14분 32초</span>
            </li>
          </BottomInfo>
          <button css={allTrainsBtnCss}>전체 시간표</button>
        </ContentArea>
      </SubwayInfo>
    </div>
  );
};

const SubwayInfo = styled.div`
  position: relative;
  width: 100%;
  min-height: 180px;
  border-radius: 20px;
  background-color: #2e2e2e;
`;

const ThickBorderArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #20b154;
`;

const StationLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 3px solid #20b154;
  border-radius: 21px;
  padding: 8px 32px;
  background-color: #ffffff;
  transform: translateY(-50%);
`;

const DirectionLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 157px;
  transform: translateY(-50%);
  color: #ffffff;
`;

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 54px 20px 24px 20px;
`;

const TrainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const TrainInfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;

  & > span {
    font-size: 12px;
    color: #b4b4b4;
  }

  & > div {
    display: flex;
    align-items: center;
    column-gap: 4px;

    & > ul {
      display: grid;
      min-width: 40px;
      grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
      gap: 2px;
      margin: 0 4px;

      & > li {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        &:first-of-type {
          background-color: #a2d471;
        }

        &:nth-of-type(2) {
          background-color: #ffc44d;
        }

        &:nth-of-type(3) {
          background-color: #ff884d;
        }

        &:last-of-type {
          background-color: #ee4d4d;
        }
      }
    }

    & > span {
      font-size: 12px;
      color: #ffffff;
    }

    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
      width: 10px;
      height: 10px;
      padding: 2px;
      border-radius: 50%;
      position: relative;
      top: 1px;

      color: #ffffff;
      background-color: #000000;
    }
  }
`;

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 18px;

  & > b {
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
    color: #28b2ff;
  }

  & > span {
    font-size: 14px;
    color: #ffffff;
  }

  & > button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    & > div > svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const BottomInfo = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  row-gap: 12px;
  margin: 48px 0 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(210, 210, 210, 0.09);

  & > li {
    display: flex;
    align-items: center;
    width: 100%;

    &:first-of-type {
      font-weight: bold;
    }

    & > b {
      font-weight: 400;
      color: #ffffff;
      font-size: 14px;
      margin-right: 8px;
    }

    & > span {
      color: #28b2ff;
      font-size: 14px;
    }
  }
`;

const allTrainsBtnCss = css`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: 24px;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  background: #808080;
`;

export default Subway;
