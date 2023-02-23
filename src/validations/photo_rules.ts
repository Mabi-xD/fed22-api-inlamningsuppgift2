/**
 * Validation Rules for photo resource
 */
import { body } from 'express-validator'


export const createPhotoRules = [
	body('title').exists().isString().bail().isLength({ min: 3 }),
	body('url').exists().isString().bail().isURL().isLength({ min: 3 }),
	body('comment').optional().isString().bail().isLength({ min: 3}),
]

export const updatePhotoRules = [
	body('title').optional().isString().bail().isLength({ min: 3 }),
	body('url').optional().isString().bail().isURL().isLength({ min: 3 }),
	body('comment').optional().isString().bail().isLength({ min: 3}),
]