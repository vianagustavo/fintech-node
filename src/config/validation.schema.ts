import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'homolog', 'staging', 'production', 'test')
    .default('development'),
  PORT: Joi.any().default(process.env.PORT || 3000),
  DATABASE_URL: Joi.string().required(),
  PEOPLE_SECRET: Joi.string().required(),
});
