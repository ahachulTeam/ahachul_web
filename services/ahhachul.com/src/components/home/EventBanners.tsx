import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Text } from "@ahhachul/react-components-layout";
import { withSuspense } from "@ahhachul/react-hooks-utility";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";

function EventBanners() {
  // @ts-ignore
  const { data } = useEventBanners();

  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {/* @ts-ignore */}
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  {/* 왼쪽 */}
                  <Flex direction="column">
                    <Text fontSize="lg">{banner.title}</Text>
                    <Text fontSize="md">{banner.subTitle}</Text>
                  </Flex>
                  {/* 오른쪽 */}
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`;

function WrapErrorBoundary() {
  return (
    <ErrorBoundary fallbackComponent={<></>}>
      <EventBanners />
    </ErrorBoundary>
  );
}

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  );
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
});
