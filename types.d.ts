/**
 * Type Definitions
 */

export type CreateAuthorData = {
	name: string,
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
