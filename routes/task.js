const express = require('express')
const methodNotAllowed = require('../middlewares/methodNotAllowed.js')
const { createTask, editTask, deleteTask, fetchTask, allTasks } = require('../controllers/task.js')
const authentication = require('../middlewares/auth.js')
const router = express.Router()

router.route('/create-task').post(authentication,createTask).all(methodNotAllowed)
router.route('/edit-task/:id').patch(editTask).all(methodNotAllowed)
router.route('/delete-task/:id').delete(deleteTask).all(methodNotAllowed)
router.route('/fetch-task/:id').get(fetchTask).all(methodNotAllowed)
router.route('/fetch-tasks').get(authentication,allTasks).all(methodNotAllowed)

module.exports = router