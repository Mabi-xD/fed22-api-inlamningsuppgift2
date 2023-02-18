import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

const debug = Debug('fed22-api-inlamningsuppgift2:photo_controller')



/**
 * Get all photos
 */

export const index = async (req: Request, res: Response) => {
    try {
        const photos = await prisma.photo.findMany()

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
        const photos = await prisma.photo.findUniqueOrThrow({
            where: {
                id: photoId,
            },
            include: {
                user: true,
                albums: true,
            }
        })

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
 * Create an photo
 */
export const store = async (req: Request, res: Response) => {
	try {
		const photo = await prisma.photo.create({
            data: {
                title: req.body.title,
                userId: req.body.userId,
                url: req.body.url,
                comment: req.body.url,
            }
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

	try {
		const photo = await prisma.photo.update({
            where: {
                id: photoId,
            }, 
            data: {
                title: req.body.title,
                comment: req.body.title
            }
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

