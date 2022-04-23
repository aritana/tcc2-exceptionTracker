
import fetch from 'node-fetch';

function handleErrors(error) {
    throw new Error(error.message);
}

async function statusCheck(arrayURLs) {
    //call back need to be async
    try {
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return res.status;
                }));
        return arrayStatus;
    } catch (error) {
        handleErrors(error)
    }


}

function generateURLArrays(arrayLinks) {

    return arrayLinks
        .map(linkObject => Object
            .values(linkObject).join());
}


export async function validaURLs(arrayLinks) {

    const links = generateURLArrays(arrayLinks);
    const statusLinks = await statusCheck(links);
    //spread operator
    const result = arrayLinks.map((object, index) => ({
        ...object, value: statusLinks[index]
    }));
    return result;
}

