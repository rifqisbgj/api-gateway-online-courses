const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media');

router.post('/', mediaHandler.create);
router.get('/', mediaHandler.getAllMedia);
router.delete('/:id', mediaHandler.deleteMedia);

module.exports = router;
