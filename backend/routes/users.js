const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL } = require('../utils/constans');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfileUser,
  updateAvatarUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfileUser,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(REGEXP_URL),
    }),
  }),
  updateAvatarUser,
);

module.exports = usersRouter;
