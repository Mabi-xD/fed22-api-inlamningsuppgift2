/**
 * Photo Service
 */
import prisma from '../prisma'
import { matchedData, validationResult } from 'express-validator'
import { JwtPayload } from '../../types'
import { CreatePhotoData } from '../../types'


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
 * POST photo for validated user.
 */

export const addPhoto = async (data: CreatePhotoData) => {
    return  await prisma.photo.create({
        data: {
            title: data.title,
            url: data.url,
            comment: data.comment,
            userId: data.userId,
        }
        
    })
}