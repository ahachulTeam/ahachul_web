import Announcement from './Announcement'
import Facilities from './Facilities'
import Impediment from './Impediment'
import Patient from './Patient'
import Sexual from './Sexual'
import Temperature from './Temperature'
import Violence from './Violence'

export const ComplaintContentsKeys = {
  facilities: '시설 · 환경민원',
  temperature: '온도조절',
  announcement: '안내방송',
  impediment: '질서저해',
  patient: '응급환자',
  sexual: '성추행',
  violence: '폭력',
} as const

interface Props {
  selectedTab: keyof typeof ComplaintContentsKeys
}

export default function ComplaintDrawerContents({ selectedTab }: Props) {
  switch (selectedTab) {
    case 'facilities':
      return <Facilities />
    case 'temperature':
      return <Temperature />
    case 'announcement':
      return <Announcement />
    case 'impediment':
      return <Impediment />
    case 'patient':
      return <Patient />
    case 'sexual':
      return <Sexual />
    case 'violence':
      return <Violence />
  }
}
