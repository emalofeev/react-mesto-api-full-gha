const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');
const InternalServerError = require('../errors/InternalServerError');
const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь по указанному _id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные пользователя'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Пользователь по указанному _id не найден'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
        return;
      }
      if (err.code === 11000) {
        next(
          new ConflictingRequest(
            'При регистрации указан email, который уже существует на сервере',
          ),
        );
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении профиля'),
        );
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Пользователь по указанному _id не найден'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении аватара'),
        );
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Пользователь по указанному _id не найден'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        ),
      });
    })
    .catch(next);
};
