/**
 * Type Definitions
 */

export type CreateAlbumData = {
	title: string,
}

export type CreatePhotoData = {
	title: string,
	url: string,
	comment: string,
	userId: number,
}

export type getPhotoData = {
	photoId: number,
}

export type CreateUserData = {
	first_name: string,
	last_name: string,
	email: string,
	password: string,
}

export type UpdateUserData = {
	first_name?: string,
	last_name?: string,
	email?: string,
	password?: string,
}

export type JwtPayload = {
	sub: number,
	first_name: string,
	last_name: string,
	email: string,
	iat?: number,
	exp?: number,
}
