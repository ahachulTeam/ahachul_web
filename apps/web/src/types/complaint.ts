export type ComplaintTargets =
  | 'patient'
  | 'sexual'
  | 'violence'
  | 'announcement'
  | 'facilities'
  | 'impediment'
  | 'temperature'

export interface ComplaintMessageRequest {
  content: string
  phoneNumber: string
  trainNo: string
  subwayLineId: number
}

export type ComplaintCardVariant = 'primary' | 'secondary' | 'inactive'
