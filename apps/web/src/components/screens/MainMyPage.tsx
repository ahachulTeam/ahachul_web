import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import PageTemplate from "../public/PageTemplate";
import { ProfilePrimaryIcon, StarIcon } from "@/assets/icons";
import { PATH } from "@/constants";
import { UserGender } from "@/constants/format";
import { useAuth } from "@/context";
import { useMyProfileQuery } from "@/services";
import { KeyOf } from "@/types";

function MyPageMainScreen() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { data: user } = useMyProfileQuery({ enabled: isLoggedIn });

  const handleRouteSettingUserStations = () => {
    router.push(PATH.SETTING_USER_STATIONS);
  };

  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        <UserOverviewInfos>
          <Nickname>{user?.nickname}님의 아하철 🚉</Nickname>
          <SmallInfos>
            <span>{user?.ageRange}</span>
            <span>{UserGender[user?.gender as KeyOf<typeof UserGender>]}</span>
          </SmallInfos>
          <Stations>
            <Button color={"#60B157"}>신도림역</Button>
            <Button color={"#fe8a39"}>교대역</Button>
            <Button color={"#D2386E"}>장지역</Button>
          </Stations>
          <ButtonSection>
            <TextButton>
              <ProfilePrimaryIcon />
              <span>프로필 설정</span>
            </TextButton>
            <TextButton onClick={handleRouteSettingUserStations}>
              <StarIcon />
              <span>즐겨찾는 역</span>
            </TextButton>
          </ButtonSection>
        </UserOverviewInfos>
        <UserHistorySection>
          <TabButton />
        </UserHistorySection>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  );
}

const UserOverviewInfos = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  padding-bottom: 0;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Nickname = styled.h3`
  margin-bottom: 12px;
`;
const SmallInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;

  & > span {
    color: #767676;
  }
`;
const Stations = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ebee;
`;

const Button = styled.button<{ color: string }>`
  ${({ color }) => css`
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border: 2px solid ${color};
    border-radius: 21px;
    color: ${color};
  `}
`;

const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const TextButton = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const UserHistorySection = styled.div``;
const TabButton = styled.button``;

export default MyPageMainScreen;
