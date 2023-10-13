import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'homolog', 'staging', 'production', 'test')
    .default('production'),
  PORT: Joi.any().default(process.env.PORT || 3000),
  PAGINATION_PAGE: Joi.number().required(),
  PAGINATION_PAGE_SIZE: Joi.number().required(),
});
