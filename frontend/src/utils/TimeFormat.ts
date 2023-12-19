export const formatTime = (date: string) => {
    const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000)

    let n = Math.floor(seconds / 86400)
    if (n > 1 && n < 8) {
        return n + ' days ago'
    }

    if (n > 7) {
        return date.split('T')[0].split('-').reverse().join('-')
    }

    n = Math.floor(seconds / 3600)
    if (n > 1) {
        return n + ' hours ago'
    }

    n = Math.floor(seconds / 60)
    if (n >= 1) {
        return n + ' minutes ago'
    }

    if (seconds < 10) return 'just now'

    return Math.floor(seconds) + ' seconds ago'
}