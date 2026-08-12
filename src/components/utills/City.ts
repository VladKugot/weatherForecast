export interface cityFetch {
    lat: string,
    lon: string,
    addresstype: string,
    name: string,
    display_name: string,
    boundingbox: string[],
    type: string,
    place_id: string,
    address?: Address | null,
}

export interface Address {
    city: string,
    country: string
}