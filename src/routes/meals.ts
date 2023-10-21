import { createMeal } from '@/http/controllers/meals/create';
import { deleteMeal } from '@/http/controllers/meals/delete';
import { getManyMeals } from '@/http/controllers/meals/getMany';
import { getSingleMeal } from '@/http/controllers/meals/getSingle';
import { updateMeal } from '@/http/controllers/meals/update';
import { FastifyInstance } from 'fastify';

export async function mealRoutes(app: FastifyInstance) {
  app.get('/meals', getManyMeals);

  app.get('/meals/:id', getSingleMeal);

  app.post('/meals', createMeal);

  app.put('/meals/:id', updateMeal);

  app.delete('/meals/:id', deleteMeal);
}
