import express from 'express'
import { addPhotoToAlbum, index, show, store, update } from '../controllers/album_controller'
import { createAlbumRules, addPhotoToAlbumRules } from '../validations/album_rules'

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
router.post('/', createAlbumRules,  store)

/**
 * PATCH /albums
 */
router.patch('/:albumId', update)

/**
 * ADD photo to album
 */

router.patch('/:albumId/photos', addPhotoToAlbumRules, addPhotoToAlbum)

export default router
