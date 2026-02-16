# Route Parity Map (Vite -> Next)

## Canonicalized Mapping Baseline
| Vite Route | Next Route | Status | Strategy |
| --- | --- | --- | --- |
| `/community` | `/community` | Ready | direct |
| `/community/[id]` | `/community/[id]` | Ready | direct |
| `/complaint` | `/complaint` | Partial | implement list parity |
| `/complaint/[id]` | `/complaint/[id]` | Partial | bugfix + parity |
| `/lostFound` | `/lost-found` | Ready | standardized |
| `/lostFound/[id]` | `/lost-found/[id]` | Ready | standardized |
| `/my` | `/me` | Partial | redirect + parity |
| `/notification` | `/notifications` | Partial | redirect + parity |
| `/auth/login` | `/login` | Partial | redirect + parity |
| `/auth/callback` | `/login/callback` | Partial | redirect + parity |

## Missing Domain Buckets (planned)
- `comment/*`
- `hashtag`
- `news/*`
- `subway/*`
- `talk/*`
