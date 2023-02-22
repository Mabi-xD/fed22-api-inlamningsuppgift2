/**
 * Validation Rules for photo resource
 */
import { body } from 'express-validator'


export const createAlbumRules = [
	body('title').isString().bail().isLength({ min: 1 }),
]