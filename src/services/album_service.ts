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
        }
    })
}

/**
 * POST album for validated user.
 */

export const addAlbum = async (data: CreateAlbumData) => {
    return  await prisma.album.create({
        data: {
            title: data.title,
            userId: data.userId,
        }
        
    })
}

/**
 * Update a album
 */

export const updateAlbum = async (albumId: number, data: UpdateAlbumData) => {
    return await prisma.album.update({
        where: {
            id: albumId,
        }, 
        data: data
    })
}
