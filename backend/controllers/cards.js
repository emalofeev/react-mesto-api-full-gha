const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const { statusCodeCreated } = require('../utils/constans');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(statusCodeCreated).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequest('Переданы некорректные данные при создании карточки'),
        );
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка по указанному _id не найдена'));
        return;
      }
      if (card.owner._id.toString() !== req.user._id) {
        next(new Forbidden('Попытка удалить чужую карточку'));
        return;
      }
      Card.deleteOne().then(res.send(card));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка по указанному _id не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан несуществующий _id карточки'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка по указанному _id не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан несуществующий _id карточки'));
        return;
      }
      next(err);
    });
};
