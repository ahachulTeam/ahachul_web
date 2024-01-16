// import CommunityOverview from "../domain/home/community/CommunityOverview";
// import SubwayInformation from "../domain/home/subway/SubwayInformation";
// import SubwayOverview from "../domain/home/subwayOverview/SubwayOverview";
// import PageTemplate from "../public/PageTemplate";
// import { UserStationsModel } from "@/types";

// interface HomeMainScreenProps {
//   isLoggedIn: boolean;
//   userStations?: UserStationsModel;
// }

// function HomeMainScreen({ isLoggedIn, userStations }: HomeMainScreenProps) {
//   return (
//     <PageTemplate>
//       <PageTemplate.ContentsSection>
//         {isLoggedIn &&
//         userStations &&
//         userStations?.stationInfoList?.length > 0 ? (
//           <SubwayInformation userStations={userStations} />
//         ) : (
//           <SubwayOverview isLoggedIn={isLoggedIn} />
//         )}
//         <CommunityOverview />
//       </PageTemplate.ContentsSection>
//     </PageTemplate>
//   );
// }

// export default HomeMainScreen;

export {};
