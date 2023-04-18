const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const InternalServerError = require('../errors/InternalServerError');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ name: card.name, link: card.link, _id: card._id }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при создании карточки'),
        );
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка по указанному _id не найдена'));
      }
      if (card.owner._id.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId).then(
          res.send({ data: card }),
        );
      } else {
        next(new Forbidden('Попытка удалить чужую карточку'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка по указанному _id не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные для постановки лайка'),
        );
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Передан несуществующий _id карточки'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка по указанному _id не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Передан несуществующий _id карточки'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};
