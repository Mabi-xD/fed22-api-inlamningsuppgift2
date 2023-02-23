import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import prisma from '../prisma'
import { getAllAlbums, getAlbum, addAlbum, updateAlbum, updateAlbumWithPhoto } from '../services/album_service'
import { checkPhoto } from '../services/photo_service'

const debug = Debug('fed22-api-inlamningsuppgift2:album_controller')

/**
 * Get all albums
 */

export const index = async (req: Request, res: Response) => {
    try {
        const albums = await getAllAlbums(req.token!.sub)

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
        const album = await getAlbum(albumId, req.token!.sub)
        
        res.send({
            status: "success",
            data: album
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
		const album = await addAlbum({
            title: validatedData.title,
            userId: req.token!.sub,
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
		const album = await updateAlbum(albumId, req.body)

        if(album.userId !== req.token!.sub ) {
            return res.status(403).send({ status: "fail", message: "You do not have access to this album."})
        }

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
 * Add photo to an album
 */
export const addPhotoToAlbum = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    const { id } = req.body
    const photo = await checkPhoto(id)

    if (!photo) {
		return res.status(404).send({
			status: "error",
			message: "That photo doesn't exist",
		})
	}

    if(photo.userId !== req.token!.sub) {
        return res.status(403).send({ status: "fail", message: "You do not have access to this photo."})
    }


	try {
		const album = await updateAlbumWithPhoto(albumId, id)

    if(album.userId !== req.token!.sub ) {
        return res.status(403).send({ status: "fail", message: "You do not have access to this album."})
    }

		res.send({
			status: "success",
			data: album,
		})

	} catch (err) {
		debug("Error thrown when creating an album %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}