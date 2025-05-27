const express = require('express')
const {togglePinQuestion,updateQuestion,addQuestion}= require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', protect, addQuestion);
router.put('/:id/note', protect, updateQuestion);
router.put('/:id/pin', protect, togglePinQuestion);


module.exports = router;