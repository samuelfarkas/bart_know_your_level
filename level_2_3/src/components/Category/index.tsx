import React, {useEffect, useState} from 'react';
import Grid from "../Grid";
import {Link, useParams} from 'react-router-dom';
import {getGallery, getImage, Image, uploadImages} from "../../config/http";
import Card from "../Card";
import AddCard from "../Card/add_card";
import backIcon from '../../assets/icons/back.svg';
import Gallery from "../Gallery";
import UploadModal from "../UploadModal";


const Category = () => {
    let {category} = useParams();
    const [images, setImages] = useState<Image[]>([]);
    const [pickedImage, setPickedImage] = useState<number>(-1);
    const [showUpload, setShowUpload] = useState<boolean>(false);

    useEffect(() => {
        if (category) {
            (async () => {
                const data = await getGallery(category);
                setImages(data.images);
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleUpload = () => {
        setShowUpload(prevState => !prevState);
    };

    const openGallery = (index: number) => {
        setPickedImage(index);
    };

    const closeGallery = () => {
        setPickedImage(-1);
    };


    const onUploadHandler = async (images: File[]) => {
        if(category && images && images.length > 0) {
            const response = await uploadImages(images, category);
            if(response) {
                setImages((prevState) => [...prevState, ...response.uploaded]);
            }
            toggleUpload();
        }
    };

    let imagesToRender: JSX.Element[] = [];

    if (images.length > 0) {
        imagesToRender = images.map((image: Image, i: number) => {
            const img = image ? getImage(image.fullpath, 600) : '';
            return <div key={`image_${i}`} onClick={() => openGallery(i)}>
                <Card name={image.name} image={img} withoutDesc/>
            </div>
        })
    }

    return (<>
            <Link to="/" className="back-link">
                <img src={backIcon} alt="back"/>
                {category || 'Error'}
            </Link>
            <Grid>
                {imagesToRender.length > 0 ? imagesToRender : null}
                <AddCard photo onClick={toggleUpload}/>
            </Grid>
            {pickedImage > -1 ? <Gallery images={images} index={pickedImage} onClose={closeGallery}/> : null}
            {showUpload ? <UploadModal onConfirm={onUploadHandler} onClose={toggleUpload}/> : null}
        </>
    );
};

export default Category;
