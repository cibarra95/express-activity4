const createError = require('http-errors');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.list = (req, res, next) => {
  const criteria = {}

  if (req.query.search) {
    criteria.post = new RegExp(req.query.search, 'i')
  }

  Post.find(criteria)
    .then(posts => res.json(posts))
    .catch(next);
    // .populate('likes')
    // .populate({
    //   path: 'comments',
    //   populate: {
    //     path: 'user'
    //   } 
    // })
    // .populate('author')

}

module.exports.info = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        next(createError(404, 'post not found'))
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  req.post.delete()
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const data = { text } = req.body

  Post.create({
    ...data,
  })
    .then(post => res.status(201).json(post))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const data = req.body;

  Post.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(updatedPost);
    })
    .catch(next);
};


module.exports.like = (req, res, next) => {
  const data = { post: req.params.id, user: req.user.id }

  Like.findOne(data)
    .then(like => like ? like.delete() : Like.create(data))
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.createComment = (req, res, next) => {
  const data = { text } = req.body

  Comment.create({
    ...data,
    user: req.user.id,
    post: req.params.id
  })
    .then((comment) => res.status(201).send(comment))
    .catch(next)
}

module.exports.deleteComment = (req, res, next) => {
  req.comment.delete()
    .then(() => res.status(204).send())
    .catch(next)
}
