/**
 * Album Service
 */
import prisma from '../prisma'
import { UpdateAlbumData, CreateAlbumData } from '../../types'


/**
 * GET all albums for validated user.
 */
export const getAllAlbums = async ( sub: number) => {
    return  await prisma.album.findMany({
        where: {
            userId: sub,
        }
    })
}



/**
 * GET a specific album for validated user.
 *
 * @param albumId the Id of the album to get
 */
export const getAlbum = async (albumId: number, sub: number) => {
    return await prisma.album.findFirstOrThrow({
        where: {
            id: albumId,
            userId: sub,
        }, include: {
            photos: true,
        }
    })
}

/**
 * POST album for validated user.
 */

export const addAlbum = async (data: CreateAlbumData) => {
    return  await prisma.album.create({
        data: data,
    })
}

/**
 * Update a album
 */

export const updateAlbum = async (albumId: number, title: string) => {
    return await prisma.album.update({
        where: {
            id: albumId,
        }, 
        data: { title
        }
    })
}

/**
 * Add photo to Album
 */

export const updateAlbumWithPhoto = async (albumId: number, id: number ) => {
    return await prisma.album.update({
        where: {
            id: albumId,
        }, 
        data: {
            photos: {
                connect: {
                  id: id
                },
        }
    }
})
}