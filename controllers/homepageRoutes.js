const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); // for auth.js


router.get('/', async (req, res) => {
  try {
    // To join w/ user data
    const postData = await Post.findAll({
      include: [User, {
        model: Comment,
        attributes: ['id', 'comment', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
        {
          model: User,
          attributes: ['username'],
        }],
    });


    // serializing the data for template to process
    const posts = postData.map((post) => post.get({ plain: true }));

    // passing data and session into template
    res.render('homePage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          attributes: ['id', 'comment', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        }, {
          model: User,
          attributes: ['username'],
        }
      ],
    });


    const post = postData.get({ plain: true });

    res.render('post', {
      ...post, logged_in: req.session.logged_in

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // session ID find user logged in
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // redirecting request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;