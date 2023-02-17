import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

const debug = Debug('fed22-api-inlamningsuppgift2:album_controller')

/**
 * Get all albums
 */

export const index = async (req: Request, res: Response) => {
    try {
        const albums = await prisma.album.findMany()

        res.send({
            status: "success",
            data: albums
        })

    } catch (err){
        debug("Error thrown when finding albums %o", err)
		return res.status(404).send({ status: "error", message: "Not found" })
    }
}

/**
 * Get a specific album
 */

export const show = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)

    try {
        const albums = await prisma.album.findUniqueOrThrow({
            where: {
                id: albumId,
            },
            include: {
                user: true,
                photos: true,
            }
        })

        res.send({
            status: "success",
            data: albums
        })

    } catch (err){
        debug("Error thrown when finding albums %o", err)
		return res.status(404).send({ status: "error", message: "Not found" })
    }
}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {
	try {
		const album = await prisma.album.create({
            data: {
                title: req.body.title,
                user: req.body.user
            }
        })

		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when creating an album %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)

	try {
		const album = await prisma.album.update({
            where: {
                id: albumId,
            }, 
            data: {
                title: req.body.title
            }
        })

		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when creating an album %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

