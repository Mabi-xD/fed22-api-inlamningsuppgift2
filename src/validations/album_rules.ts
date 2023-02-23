/**
 * Validation Rules for photo resource
 */
import { body } from 'express-validator'


export const createAlbumRules = [
	body('title').isString().bail().isLength({ min: 3 }),
]

export const updateAlbumRules = [
	body('title').optional().isString().bail().isLength({ min: 3 }),
]

export const addPhotoToAlbumRules = [
    body('id').isInt(),
]

