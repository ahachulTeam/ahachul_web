import React, { PropsWithChildren } from "react";

// import BottomSheetForLogin from "@/components/public/cta/BottomSheetForLogin";
// import { useAuth } from "@/context";
import { useGetHottestHashtagsQuery, useGetSubwayList } from "@/services";

function AppInner({ children }: PropsWithChildren) {
  // const { isLoggedIn } = useAuth();
  useGetSubwayList();
  useGetHottestHashtagsQuery();

  return (
    <React.Fragment>
      {children}
      {/* {!isLoggedIn && <BottomSheetForLogin />} */}
    </React.Fragment>
  );
}

export default AppInner;
