const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regex = require('../utils/constans');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfileUser,
  updateAvatarUser,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);
usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfileUser,
);
usersRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(regex),
    }),
  }),
  updateAvatarUser,
);

module.exports = usersRouter;
