const REST_URL = 'http://api.programator.sk';

const Endpoints = {
    images: `${REST_URL}/images`,
    gallery: `${REST_URL}/gallery`
};

export interface Image {
    fullpath: string;
    name: string;
}

export interface Gallery {
    path: string;
    name: string;
    image?: Image
}

async function getGalleries(): Promise<{ galleries: Gallery[] }> {
    const response = await fetch(Endpoints.gallery);
    return response.json();
}

async function getGallery(id: string): Promise<{ images: Image[] }> {
    const response = await fetch(`${Endpoints.gallery}/${id}`);
    return response.json();
}

async function createGallery(name: string): Promise<Gallery> {
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

const getImage = (fullPath: string, w = 100, h = 0): string => `${Endpoints.images}/${w}x${h}/${fullPath}`;


const uploadImages = async (images: File[], galleryPath: string): Promise<{uploaded: Image[]} | null> => {
    const formData = new FormData();
    images.forEach((file) => {
        formData.append(file.name, file)
    });

    try {
        const response = await fetch(`${Endpoints.gallery}/${galleryPath}`, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch {
        return null;
    }
};

export {getGalleries, getGallery, getImage, createGallery, uploadImages};
