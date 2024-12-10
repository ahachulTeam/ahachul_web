import React, { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import FullImageViewer from './FullImageViewer';
import type { ResponseOfImage } from 'entities/with-server';
import { Modal } from 'shared/ui/Modal';
import { CloseIcon } from 'shared/static/icons/close';

interface Props {
  isOpen: boolean;
  images: ResponseOfImage[];
  clickedIndex?: number;
  onClose: () => void;
}

export const FullImageDialog: React.FC<Props> = ({
  isOpen,
  images,
  clickedIndex = 0,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(clickedIndex);
  const [headerShown, setHeaderShown] = useState(true);
  const [isPanEnabled, setIsPanEnabled] = useState(false);

  const handleZoomChange = useCallback(
    (scale: number) => setIsPanEnabled(scale > 1),
    [],
  );
  const handleInteractionEnd = useCallback(() => setHeaderShown(true), []);
  const handleInteractionStart = useCallback(() => setHeaderShown(false), []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(clickedIndex);
      setIsPanEnabled(false);
    }
  }, [isOpen, clickedIndex]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrap>
        <Header headerShown={headerShown} isPanEnabled={isPanEnabled}>
          <CloseIcon onClick={onClose} />
          <Title>
            {currentIdx + 1}/{images.length}
          </Title>
        </Header>
        <Body isPanEnabled={isPanEnabled}>
          {images.length === 1 ? (
            <FullImageViewer
              src={images[0].imageUrl}
              isPanEnabled={isPanEnabled}
              onZoomChange={handleZoomChange}
              onInteractionStart={handleInteractionStart}
              onInteractionEnd={handleInteractionEnd}
            />
          ) : (
            <StyledSwiper
              slidesPerView={1}
              spaceBetween={0}
              initialSlide={clickedIndex}
              onSlideChange={(swiper) => setCurrentIdx(swiper.activeIndex)}
            >
              {images.map((img) => (
                <SwiperSlide key={img.imageId}>
                  <FullImageViewer
                    src={img.imageUrl}
                    isPanEnabled={isPanEnabled}
                    onZoomChange={handleZoomChange}
                    onInteractionStart={handleInteractionStart}
                    onInteractionEnd={handleInteractionEnd}
                  />
                </SwiperSlide>
              ))}
            </StyledSwiper>
          )}
        </Body>
      </Wrap>
    </Modal>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #000;
`;

const Header = styled.div<{ headerShown: boolean; isPanEnabled: boolean }>`
  width: 100%;
  height: 58px;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  background-color: ${(props) =>
    props.isPanEnabled ? 'rgba(0,0,0,0)' : '#000'};

  & > span,
  & > div {
    opacity: ${(props) => (props.headerShown ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }
`;

const Title = styled.span`
  font-family: preSemiBold;
  font-size: 18px;
  line-height: 28px;
  color: #fff;
  letter-spacing: -0.2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Body = styled.div<{ isPanEnabled: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.isPanEnabled ? '0' : '58px 0')};
  transition: padding 0.3s ease-in-out;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
