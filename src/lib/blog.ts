const base_url = process.env.BASE_URL_CONTENTFUL
const space_id = process.env.SPACE_ID_CONTENTFUL
const token_id = process.env.TOKEN_ID_CONTENTFUL
import resolveRespone from "contentful-resolve-response"

export const getBlogs = async() => {
    const res = await fetch (`${base_url}/spaces/${space_id}/environments/master/entries?access_token=${token_id}&content_type=blog&include=10`, {next: {revalidate: 10}})
    const data = await res.json()

    const response = {
        items: data.items,
        includes: data.includes
    }

    const items = resolveRespone(response)

    return items
}

export const getBlogSlug = async( slug: string ) => {
    const res = await fetch (`${base_url}/spaces/${space_id}/environments/master/entries?access_token=${token_id}&content_type=blog&include=10&fields.slug=${slug}`, {next: {revalidate: 3600}})
    const data = await res.json()

    const response = {
        items: data.items,
        includes: data.includes
    }

    const items = resolveRespone(response)

    return items[0]
}