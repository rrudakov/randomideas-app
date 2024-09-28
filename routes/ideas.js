const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

router.get('/', async (_request, response) => {
  try {
    const ideas = await Idea.find();
    response.json({ success: true, data: ideas });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    if (!idea) {
      response
        .status(404)
        .json({ success: false, error: 'Resource not found' });
    } else {
      response.json({ success: true, data: idea });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);

    // Match the usernames
    if (idea.username === request.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        request.params.id,
        {
          $set: {
            text: request.body.text,
            tag: request.body.tag,
          },
        },
        { new: true },
      );
      response.json({ success: true, data: updatedIdea });
    } else {
      response.status(403).json({
        success: false,
        error: 'You are not authorized to update this resource',
      });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);

    // Match the usernames
    if (idea.username === request.body.username) {
      await Idea.findByIdAndDelete(request.params.id);
      response.json({ success: true, data: {} });
    } else {
      response.status(403).json({
        success: false,
        error: 'You are not authorized to delete this resource',
      });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});

router.post('/', async (request, response) => {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const savedIdea = await idea.save();
    response.json({ success: true, data: savedIdea });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
