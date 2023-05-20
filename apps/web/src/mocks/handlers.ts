import { rest } from 'msw'

import { BASE_URL } from '@/apis'

const handlers = [
  rest.get(`${BASE_URL}/sample`, (req, res, ctx) => {
    const products = [
      {
        category: 'Fruits',
        price: '$1',
        stocked: true,
        name: 'Apple',
      },
    ]

    return res(ctx.status(200), ctx.json({ products }))
  }),
]

export default handlers
