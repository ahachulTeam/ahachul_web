import { useRouter } from "next/router";
import { Divider, Flex, Text } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import MyActivityTab from "~/components/me/MyActivityTab";
import ResetButton from "~/components/shared/ResetButton";
import {
  SettingSVG,
  EditSVG,
  FancyArrowSVG,
  CirclePlusSVG,
} from "~/assets/icons";

export default function MePage() {
  const router = useRouter();

  return (
    <Layout background="var(--gray-100)">
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        right={
          <ResetButton
            ItemComponent={<SettingSVG />}
            onClick={() => router.push("/me/setting/etc")}
          />
        }
      />
      <main style={{ background: "white" }}>
        <Flex
          align="center"
          justify="space-between"
          style={{
            width: "100%",
            height: "74px",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <Text fontSize="md" style={{ fontWeight: 600 }}>
            효봄이
          </Text>
          <ResetButton
            ItemComponent={<EditSVG />}
            onClick={() => router.push("/me/setting/nickname")}
          />
        </Flex>
        <Flex
          as="button"
          align="center"
          justify="center"
          style={{
            width: "100%",
            height: "76px",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
          onClick={() => router.push("/me/complaints")}
        >
          <Flex
            align="center"
            gap="6px"
            style={{
              position: "relative",
              width: "100%",
              height: "46px",
              borderRadius: "15px",
              border: "1.5px solid transparent",
              backgroundImage:
                "linear-gradient(#fff, #fff), linear-gradient(263deg, #50BEFD 0%, #2EE477 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
              boxSizing: "border-box",
            }}
          >
            <Text
              fontSize="sm"
              style={{
                color: "#000",
                fontWeight: 600,
                paddingLeft: "16px",
                lineHeight: "130%",
                letterSpacing: "-0.56px",
              }}
            >
              접수한 민원
            </Text>
            <Text
              fontSize="sm"
              style={{
                color: "#9EA1AA",
                fontWeight: 600,
                lineHeight: "130%",
                letterSpacing: "-0.98px",
              }}
            >
              3
            </Text>
            <FancyArrowSVG
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%",
              }}
            />
          </Flex>
        </Flex>
        <Divider size={16} style={{ borderColor: "#fff" }} />
        <Flex
          direction="column"
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{
              height: "40px",
              padding: "0 20px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Text
              fontSize="md"
              style={{
                fontWeight: 600,
                width: "max-content",
              }}
            >
              MY 지하철
            </Text>
            <ResetButton
              ItemComponent={
                <Text
                  fontSize="sm"
                  style={{ color: "#9EA1AA", fontWeight: 500 }}
                >
                  추가하기
                </Text>
              }
              onClick={() => router.push("/me/setting/station")}
            />
          </Flex>
          <Flex
            justify="center"
            align="center"
            gap="8px"
            style={{
              height: "94px",
              width: "100%",
              boxSizing: "border-box",
            }}
            onClick={() => router.push("/me/setting/station")}
          >
            <CirclePlusSVG />
            <Text
              fontSize="md"
              style={{
                fontWeight: 400,
                color: "#7F8088",
              }}
            >
              자주 방문하는{" "}
              <b style={{ color: "#171717", fontWeight: 600 }}>
                역과 호선을 선택
              </b>{" "}
              해주세요.
            </Text>
          </Flex>
        </Flex>
        <Divider size={30} style={{ borderColor: "#fff" }} />
        <Flex
          align="center"
          style={{
            height: "40px",
            padding: "0 20px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Text
            fontSize="md"
            style={{
              fontWeight: 600,
            }}
          >
            내 활동
          </Text>
        </Flex>
        <MyActivityTab />
      </main>
    </Layout>
  );
}
