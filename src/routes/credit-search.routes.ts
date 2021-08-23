import { Application } from 'express';
import asyncMethod from '../shared/async-method';
import creditSearch from '../app/creditSearch';

export default (app: Application): void => {
  app.post('/credit-search', asyncMethod(creditSearch));
};
