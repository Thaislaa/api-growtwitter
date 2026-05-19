export function isValidId(id: any): id is string {
    return typeof id === "string"
}