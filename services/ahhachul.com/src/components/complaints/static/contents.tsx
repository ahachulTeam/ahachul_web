import Image from "next/image";

import { COMPLAINTS_ROOM_SERVICE_INFO_TYPES } from "../types/contents";

import 오물 from "../room/icons/오물.png";
import 토사물 from "../room/icons/토사물.png";
import 환기요청 from "../room/icons/환기요청.png";
import 더워요 from "../room/icons/더워요.png";
import 추워요 from "../room/icons/추워요.png";
import 시끄러워요 from "../room/icons/시끄러워요.png";
import 잘안들려요 from "../room/icons/잘안들려요.png";
import 이동상인 from "../room/icons/이동상인.png";
import 취객 from "../room/icons/취객.png";
import 구걸 from "../room/icons/구걸.png";
import 종교행위 from "../room/icons/종교행위.png";
import 노숙 from "../room/icons/노숙.png";
import 행선 from "../room/icons/행선.png";
import 임산부 from "../room/icons/임산부.png";

export const COMPLAINTS_CONTENTS = {
  환경민원: {
    label: "환경민원",
    description: "토사물, 오물, 환기\n각종 환경민원",
  },
  안내방송: { label: "안내방송", description: "방송불량, 음량문제" },
  온도조절: { label: "온도조절", description: "너무 덥거나 추울 때" },
  질서저해: {
    label: "질서저해",
    description: "취객, 노숙, 구걸, 소란 열차 내 질서저해",
  },
  응급환자: {
    label: "응급환자",
    description: "열차 내 응급환자\n긴급 신고하기",
  },
  폭력: {
    label: "폭력",
    description: "열차 내 폭행 (싸움)\n발생시 신고하기",
  },
  성추행: {
    label: "성추행",
    description: "열차 내 성폭력, 몰래카메라",
  },
};

export const COMPLAINTS_ROOM_SERVICE_INFO: COMPLAINTS_ROOM_SERVICE_INFO_TYPES =
  {
    환경민원: {
      title: "민원유형 선택",
      subTitle: "토사물, 오물, 환기\n각종 환경민원",
      selectList: {
        오물: "오물",
        토사물: "토사물",
        환기요청: "환기요청",
      },
      iconList: {
        오물: (
          <Image
            alt=""
            src={오물.src}
            width={오물.width / 3}
            height={오물.height / 3}
          />
        ),
        토사물: (
          <Image
            alt=""
            src={토사물.src}
            width={토사물.width / 3}
            height={토사물.height / 3}
          />
        ),
        환기요청: (
          <Image
            alt=""
            src={환기요청.src}
            width={환기요청.width / 3}
            height={환기요청.height / 3}
          />
        ),
      },
    },
    안내방송: {
      title: "안내방송",
      subTitle: "방송불량, 음량문제",
      selectList: {
        시끄러워요: "시끄러워요/안내방송이 너무 커요",
        "잘 안들려요": "잘 안들려요/안내방송이 잘 안들려요",
      },
      secondarySelectList: {
        "행선 안내방송": "행선 안내방송",
        "임산부 배려석": "임산부 배려석",
      },
      iconList: {
        시끄러워요: (
          <Image
            alt=""
            src={시끄러워요.src}
            width={시끄러워요.width / 3}
            height={시끄러워요.height / 3}
          />
        ),
        "잘 안들려요": (
          <Image
            alt=""
            src={잘안들려요.src}
            width={잘안들려요.width / 3}
            height={잘안들려요.height / 3}
          />
        ),
        "행선 안내방송": (
          <Image
            alt=""
            src={행선.src}
            width={행선.width / 3}
            height={행선.height / 3}
          />
        ),
        "임산부 배려석": (
          <Image
            alt=""
            src={임산부.src}
            width={임산부.width / 3}
            height={임산부.height / 3}
          />
        ),
      },
      activeColor: {
        시끄러워요: {
          backgroundColor: "rgba(250, 105, 0, 0.15)",
          borderColor: "rgba(250, 105, 0, 0.70)",
          pointColor: "#F77D2D",
        },
        "잘 안들려요": {
          backgroundColor: "#E3EBFB",
          borderColor: "#649CFF",
          pointColor: "#3675E3",
        },
        "행선 안내방송": {
          backgroundColor: "rgba(46, 228, 119, 0.12)",
          borderColor: "rgba(46, 228, 119, 0.60)",
          pointColor: "#199249",
        },
        "임산부 배려석": {
          backgroundColor: "rgba(235, 31, 116, 0.06)",
          borderColor: "rgba(235, 31, 116, 0.60)",
          pointColor: "#EB1F74",
        },
      },
    },
    온도조절: {
      title: "온도조절",
      subTitle: "너무 덥거나 추울 때",
      selectList: {
        더워요: "오물/온도를 내려주세요",
        추워요: "토사물/온도를 올려주세요",
      },
      iconList: {
        더워요: (
          <Image
            alt=""
            src={더워요.src}
            width={더워요.width / 3}
            height={더워요.height / 3}
          />
        ),
        추워요: (
          <Image
            alt=""
            src={추워요.src}
            width={추워요.width / 3}
            height={추워요.height / 3}
          />
        ),
      },
      activeColor: {
        더워요: {
          backgroundColor: "rgba(234, 56, 63, 0.14)",
          borderColor: "#FF8489",
          pointColor: "#EA383F",
        },
        추워요: {
          backgroundColor: "rgba(54, 117, 227, 0.14)",
          borderColor: "#649CFF",
          pointColor: "#3675E3",
        },
      },
    },
    질서저해: {
      title: "민원유형 선택",
      subTitle: "취객, 노숙, 구걸, 소란 열차 내 질서저해",
      selectList: {
        이동상인: "이동상인",
        취객: "취객",
        노숙: "노숙",
        구걸: "구걸",
        종교행위: "종교행위",
      },
      iconList: {
        이동상인: (
          <Image
            alt=""
            src={이동상인.src}
            width={이동상인.width / 3}
            height={이동상인.height / 3}
          />
        ),
        취객: (
          <Image
            alt=""
            src={취객.src}
            width={취객.width / 3}
            height={취객.height / 3}
          />
        ),
        노숙: (
          <Image
            alt=""
            src={노숙.src}
            width={노숙.width / 3}
            height={노숙.height / 3}
          />
        ),
        구걸: (
          <Image
            alt=""
            src={구걸.src}
            width={구걸.width / 3}
            height={구걸.height / 3}
          />
        ),
        종교행위: (
          <Image
            alt=""
            src={종교행위.src}
            width={종교행위.width / 3}
            height={종교행위.height / 3}
          />
        ),
      },
    },
    응급환자: {
      title: "응급환자와 어떤 관계이신가요?",
      subTitle: "열차 내 응급환자\n긴급 신고하기",
      selectList: {
        "환자 본인": "환자 본인",
        "목격자 (제 3자)": "목격자 (제 3자)",
      },
    },
    폭력: {
      title: "폭력",
      subTitle: "열차 내 폭행 (싸움)\n발생시 신고하기",
      selectList: {
        피해자: "피해자",
        "목격자 (제 3자)": "목격자 (제 3자)",
      },
    },
    성추행: {
      title: "성추행",
      subTitle: "열차 내 성추행, 성폭력, 몰래카메라",
      selectList: {
        피해자: "피해자",
        "목격자 (제 3자)": "목격자 (제 3자)",
      },
    },
  };
