import express from "express"
import { login, refresh, register } from '../controllers/user_controller'
import { validateToken } from '../middlewares/jwt'
import { createUserRules } from '../validations/user_rules'
import albums from './albums'
import photos from './photos'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * Use /albums
 */

router.use('/albums', validateToken, albums)

/**
 * Use /photos
 */

router.use('/photos', validateToken, photos)

/**
 * POST /login
 */
router.post('/login', login)

/**
 * POST /refresh
 */

router.post('/refresh', refresh)

/**
 * POST /register
 */
router.post('/register', createUserRules, register)

export default router
