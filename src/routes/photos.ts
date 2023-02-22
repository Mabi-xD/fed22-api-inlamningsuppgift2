import express from 'express'
import { index, show, store, update } from '../controllers/photo_controller'
import { createPhotoRules } from '../validations/photo_rules'
const router = express.Router()

/**
 * GET /photos
 */
router.get('/', index)

/**
 * GET /photos/:photoId
 */
router.get('/:photoId', show)

/**
 * POST /photos
 */
router.post('/', createPhotoRules,  store)

/**
 * UPDATE /photos
 */
router.patch('/:photoId', update)

export default router
