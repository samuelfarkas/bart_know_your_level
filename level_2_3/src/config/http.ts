const REST_URL = 'http://api.programator.sk';

const Endpoints = {
    images: `${REST_URL}/images`,
    gallery: `${REST_URL}/gallery`
};

async function getGalleries(): Promise<{ galleries: any[] }> {
    const response = await fetch(Endpoints.gallery);
    return response.json();
}

async function getGallery(id: string): Promise<{images: string[]}> {
    const response = await fetch(`${Endpoints.gallery}/${id}`);
    return response.json();
}

async function createGallery(name: string) {
    const response = await fetch(Endpoints.gallery, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    });
    return response.json();
}

const getImage = (fullPath: string, w = 100, h = 0) => `${Endpoints.images}/${w}x${h}/${fullPath}`;

export {getGalleries, getGallery, getImage, createGallery};
