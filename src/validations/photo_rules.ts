/**
 * Validation Rules for photo resource
 */
import { body } from 'express-validator'


export const createPhotoRules = [
	body('title').isString().bail().isLength({ min: 3 }),
	body('url').exists().isString().bail().isURL().isLength({ min: 3 }),
	body('comment').optional().isString().bail(),
]