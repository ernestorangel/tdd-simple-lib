const keyValueToString = ([key, val]) => {
    if (typeof val === 'object' && !Array.isArray(val)) {
        throw new Error("Please, check your inputs.")
    }
    return `${key}=${val}`
}

export function queryString(obj)    {     return Object.entries(obj).map(keyValueToString).join('&');     }

export function parse(string) 
    {     return Object.fromEntries(
        string.split('&')
        .map((str) => {
            let [ key, value ] = str.split('=')
            if (value.indexOf(',') > -1) {
                value = value.split(',')
            }
            return [ key, value ]
        })
    );     }
