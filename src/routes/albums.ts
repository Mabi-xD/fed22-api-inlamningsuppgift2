import express from 'express'
import { addPhotoToAlbum, index, show, store, update } from '../controllers/album_controller'
const router = express.Router()

/**
 * GET /albums
 */
router.get('/', index)

/**
 * GET /albums/:albumId
 */
router.get('/:albumId', show)

/**
 * POST /albums
 */
router.post('/', store)

/**
 * PATCH /albums
 */
router.patch('/:albumId', update)

/**
 * ADD photo to album
 */

router.post('/:albumId/photos', addPhotoToAlbum)

export default router