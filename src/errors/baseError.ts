export abstract class BaseError extends Error {
    abstract status: number
    abstract content: object
}