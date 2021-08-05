const test = require('tape')
// const supertest = require('supertest')
const database = require('../api/models')
// const api = require('../api/index')

test('MoviesLoadTest', (t) => {
  t.assert(database.Movies.name === 'Movies', 'Carregou corretamente')
  t.end()
})

test('CategoriesLoadTest', (t) => {
  t.assert(database.Categories.name === 'Categories', 'Carregou corretamente')
  t.end()
})

// test('GET /videos', (t) => {
//   supertest(api)
//     .get('/videos')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       t.error(err, 'Sem erros')
//       t.assert(res.body.length > 0, 'Retorno Correto')
//       t.end()
//     })
// })

// test('GET /categorias/1', (t) => {
//   supertest(api)
//     .get('/categorias/1')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       t.error(err, 'Sem erros')
//       t.assert(res.body.titulo === 'LIVRE', 'Categoria Correta')
//       t.end()
//     })
// })
