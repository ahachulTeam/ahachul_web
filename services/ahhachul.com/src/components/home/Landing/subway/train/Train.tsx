const Train = () => {
  return (
    <>
      <div css={{ minHeight: '18.4px', marginBottom: '18px' }}>
        <AnimatePresence mode="wait">
          <TopInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
            <>
              {isLoading ? (
                <Skeleton
                  width="64px"
                  borderRadius={0}
                  baseColor="#2e2e2e"
                  highlightColor="rgba(255, 255, 255, 0.24)"
                />
              ) : (
                <>
                  <b>
                    {formatCurrentTrainArrivalTypeToKo(data?.trainRealTimes?.[selectedIdx]?.currentTrainArrivalCode)}
                  </b>
                  <span>{data?.trainRealTimes?.[selectedIdx]?.destinationStationDirection}</span>
                  <button
                    onClick={() => {
                      setRefetchBtnClicked(true);
                      refetch();

                      setTimeout(() => {
                        setRefetchBtnClicked(false);
                      }, 1000);
                    }}
                    css={refetchBtnCss(refetchBtnClicked)}
                  >
                    <IconFetch css={{ position: 'relative', top: '1px' }} />
                  </button>
                </>
              )}
            </>
          </TopInfo>
        </AnimatePresence>
      </div>
      <TrainInfoContainer>
        {/* Train summary */}
        <TrainInfoTop>
          <AnimatePresence mode="wait">
            {!isLoading ? (
              <motion.span variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                {data?.trainRealTimes?.[selectedIdx]?.trainNum &&
                  `전동차 ${data?.trainRealTimes?.[selectedIdx]?.trainNum}`}
              </motion.span>
            ) : (
              <span>
                <Skeleton
                  width="56px"
                  borderRadius={0}
                  baseColor="#2e2e2e"
                  highlightColor="rgba(255, 255, 255, 0.24)"
                />
              </span>
            )}
          </AnimatePresence>
          <div>
            <span>여유</span>
            <ul>
              {Array.from({ length: 4 }).map((_, idx) => (
                <li key={idx} />
              ))}
            </ul>
            <span>혼잡</span>
            <IconInfo css={{ position: 'relative', top: '1px', marginLeft: '4px' }} />
          </div>
        </TrainInfoTop>
        {/* Train Painting */}
        <div css={{ position: 'relative', minHeight: '31px' }}>
          <ErrorComponent.QueryErrorBoundary fallback={(props) => <TrainError {...props} />}>
            <Suspense
              fallback={
                <Skeleton
                  width="100%"
                  height="21px"
                  borderRadius={4}
                  baseColor="#2e2e2e"
                  highlightColor="rgba(255, 255, 255, 0.24)"
                  css={{ marginTop: '5px' }}
                />
              }
            >
              {data?.trainRealTimes?.[selectedIdx]?.trainNum ? (
                <TrainPainting
                  trainNo={data?.trainRealTimes?.[selectedIdx]?.trainNum}
                  subwayLineId={subwayLineIds[0]}
                />
              ) : (
                <Skeleton
                  width="100%"
                  height="21px"
                  borderRadius={4}
                  baseColor="#2e2e2e"
                  highlightColor="rgba(255, 255, 255, 0.24)"
                  css={{ marginTop: '5px' }}
                />
              )}
            </Suspense>
          </ErrorComponent.QueryErrorBoundary>
        </div>
        <div css={{ minHeight: '72.2px', position: 'relative', margin: '72px 0 0' }}>
          <AnimatePresence mode="wait">
            <BottomInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
              {isLoading ? (
                <>
                  {new Array(4).fill('').map((_, idx) => (
                    <li key={idx}>
                      <Skeleton
                        width="97px"
                        borderRadius={0}
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {data?.trainRealTimes?.map((item, idx) => (
                    <li key={item.currentArrivalTime} onClick={handleSelectedTrainIndex(idx)}>
                      <b
                        css={{
                          fontWeight:
                            item?.trainNum === data?.trainRealTimes?.[selectedIdx]?.trainNum ? '700 !important' : '400',
                        }}
                      >
                        {item.destinationStationDirection}
                      </b>
                      <span
                        css={{
                          fontWeight:
                            item?.trainNum === data?.trainRealTimes?.[selectedIdx]?.trainNum ? '700 !important' : '400',
                        }}
                      >
                        <Timer expiryTime={item.currentArrivalTime} />
                      </span>
                    </li>
                  ))}
                </>
              )}
            </BottomInfo>
          </AnimatePresence>
        </div>
      </TrainInfoContainer>
    </>
  );
};

export default Train;
