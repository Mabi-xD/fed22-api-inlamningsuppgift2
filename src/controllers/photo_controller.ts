import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import prisma from '../prisma'
import { getAllPhotos, getPhoto, addPhoto, updatePhoto } from '../services/photo_service'

const debug = Debug('fed22-api-inlamningsuppgift2:photo_controller')



/**
 * Get all photos
 */

export const index = async (req: Request, res: Response) => {
    try {
        const photos = await getAllPhotos(req.token!.sub)

        res.send({
            status: "success",
            data: photos
        })

    } catch (err){
        debug("Error thrown when finding photos %o", err)
		return res.status(404).send({ status: "error", message: "Not found" })
    }
}

/**
 * Get a specific photo
 */

export const show = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)

    try {
        const photo = await getPhoto(photoId, req.token!.sub)

        res.send({
            status: "success",
            data: photo
        })

    } catch (err){
        debug("Error thrown when finding photos %o", err)
		return res.status(404).send({ status: "error", message: "Not found" })
    }
}

/**
 * Create an photo
 */
export const store = async (req: Request, res: Response) => {
    // Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	// Get only the validated data from the request
	const validatedData = matchedData(req)
	console.log("validatedData:", validatedData)

	try {
		const photo = await addPhoto({
            title: validatedData.title,
            userId: req.token!.sub,
            url: validatedData.url,
            comment: validatedData.comment,
        })

		res.send({
			status: "success",
			data: photo,
		})

	} catch (err) {
		debug("Error thrown when creating an photo %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Update an photo
 */
export const update = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)

        // Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	// Get only the validated data from the request
	const validatedData = matchedData(req)
	console.log("validatedData:", validatedData)

	try {
		const photo = await updatePhoto(photoId, validatedData)

		res.send({
			status: "success",
			data: photo,
		})

	} catch (err) {
		debug("Error thrown when creating an photo %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

