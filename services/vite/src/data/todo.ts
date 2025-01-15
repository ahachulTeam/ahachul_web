export const TAB_STATE = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const

export type TabState = (typeof TAB_STATE)[keyof typeof TAB_STATE]
