import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from 'miragejs'
import faker from 'faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    serializers: {
      application: ActiveModelSerializer,
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users', (schema, request) => {
        const { page = 1, take = 10 } = request.queryParams

        const total = schema.all('user').length
        const pageStart = (Number(page) - 1) * Number(take)
        const pageEnd = pageStart + Number(take)

        const users = schema
          .all('user')
          .models.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          {
            'x-total-count': String(total),
          },
          { users }
        )
      })
      this.get('/users/:id')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
