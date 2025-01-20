export const zIndex = {
  // 기본 컨텐츠 레이어
  default: 1,

  // 네비게이션 레이어
  header: 50,
  navbar: 60,

  // 플로팅 요소 레이어
  float: 70,
  tooltip: 80,
  dropdown: 90,

  // 오버레이 레이어
  dim: 100,
  modal: 200,
  drawer: 300,

  // 시스템 레이어
  alert: 1000,
  toast: 2000,

  // 최상위 레이어
  popover: 9000,
  loading: 9500,
  error: 9999,
};

export type ZIndexType = typeof zIndex;
