/**
 * Validation Rules for photo resource
 */
import { body } from 'express-validator'
import { checkPhoto } from '../services/photo_service'


export const createAlbumRules = [
	body('title').isString().bail().isLength({ min: 3 }),
]

export const addPhotoToAlbumRules = [
    body('id').isInt().custom(async (value: number) => {
		// check if a photo with that email already exists
		const photo = await checkPhoto(value)

		if (!photo) {
			// photo already exists, throw a hissy-fit
			return Promise.reject("Photo doesn't exist")
		}
    })
]