export default function sanitizeCustomStyle(style) {
    try {
        return JSON.parse(style)
    } catch(e) {
        console.log(e)
        return {}
    }
}