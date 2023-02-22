/**
 * Photo Service
 */
import prisma from '../prisma'
import { UpdatePhotoData, CreatePhotoData } from '../../types'



/**
 * GET all photos for validated user.
 */
export const getAllPhotos = async ( sub: number) => {
    return  await prisma.photo.findMany({
        where: {
            userId: sub,
        }
    })
}

/**
 * GET a specific photo for validated user.
 *
 * @param photoId the Id of the photo to get
 */
export const getPhoto = async (photoId: number, sub: number) => {
    return await prisma.photo.findFirstOrThrow({
        where: {
            id: photoId,
            userId: sub,
        }
    })
}

/**
 * to check if photo exist
 */
export const checkPhoto = async (photoId: number) => {
    return await prisma.photo.findUnique({
        where: {
            id: photoId,
        }
    })
}


/**
 * POST photo for validated user.
 */

export const addPhoto = async (data: CreatePhotoData) => {
    return  await prisma.photo.create({
        data: data
    })
}

/**
 * Update a photo
 */

export const updatePhoto = async (photoId: number, data: UpdatePhotoData) => {
    return await prisma.photo.update({
        where: {
            id: photoId,
        }, 
        data: data
    })
}