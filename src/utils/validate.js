export const isExternal = path => {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function isString(str) {
    return typeof str === 'string'
}

export const isValidURL = url => {
    const reg = /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/i
    return reg.test(url)
}
