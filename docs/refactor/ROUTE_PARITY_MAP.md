# Route Parity Map (Vite -> Next)

## Canonicalized Mapping Baseline

| Vite Route             | Next Route              | Status  | Strategy                                        |
| ---------------------- | ----------------------- | ------- | ----------------------------------------------- |
| `/community`           | `/community`            | Ready   | direct                                          |
| `/community/[id]`      | `/community/[id]`       | Ready   | direct                                          |
| `/complaint`           | `/complaint`            | Ready   | list/detail parity with filter + infinite query |
| `/complaint/[id]`      | `/complaint/[id]`       | Ready   | bugfix + parity                                 |
| `/lostFound`           | `/lost-found`           | Ready   | standardized                                    |
| `/lostFound/[id]`      | `/lost-found/[id]`      | Ready   | standardized                                    |
| `/my`                  | `/me`                   | Ready   | redirect + profile dashboard parity             |
| `/notification`        | `/notifications`        | Ready   | redirect + notification surface parity          |
| `/auth/login`          | `/login`                | Ready   | redirect + social login parity                  |
| `/auth/callback`       | `/login/callback`       | Ready   | redirect + callback token flow parity           |
| (next-only)            | `/messages`             | Ready   | header action route completed                   |
| (next-only)            | `/user/[username]`      | Ready   | profile surface completed                       |
| `/lostFound/new`       | `/lost-found/new`       | Partial | guided entry complete, full editor pending      |
| `/lostFound/[id]/edit` | `/lost-found/[id]/edit` | Partial | guided edit entry complete, full editor pending |

## Missing Domain Buckets (planned)

- `comment/*`
- `hashtag`
- `news/*`
- `subway/*`
- `talk/*`
