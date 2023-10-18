import { FastifyInstance } from 'fastify';

export async function mealRoutes(app: FastifyInstance) {
  app.get('/meals', () => {
    console.log('TODO: get all meals');
  });

  app.get('/meals/:id', () => {
    console.log('TODO: get a meal');
  });

  app.post('/meals', () => {
    console.log('TODO: register a meal');
  });

  app.put('/meals', () => {
    console.log('TODO: update a meal');
  });

  app.delete('/meals', () => {
    console.log('TODO: delete a meal');
  });
}
