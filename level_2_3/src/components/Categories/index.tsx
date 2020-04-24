import React, {useEffect, useState} from 'react';
import Grid from "../Grid";
import AddCard from "../Card/add_card";
import AddCategoryModal from "../AddCategoryModal";
import {createGallery, Gallery, getGalleries, getImage} from "../../config/http";
import Card from "../Card";
import {useHistory} from "react-router";

interface Props {
    setBgImage: (path: string) => void
}

const Categories: React.FC<Props> = ({setBgImage}) => {
    const history = useHistory();

    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // load galleries
    useEffect(() => {
        (async () => {
            const data = await getGalleries();
            setGalleries(data.galleries);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const toggleModal = () => {
      setShowModal(prevState => !prevState);
    };


    const createCategory = async (name: string) => {
        setLoading(true);
        const res = await createGallery(name);
        setGalleries(prevGalls => [...prevGalls, res]);
        toggleModal();
        setLoading(false);
    };

    // prepare galleries render
    let galleriesRender: JSX.Element[] = [];

    if (galleries.length > 0) {
        galleriesRender = galleries.map((gallery, i) => {
            const image = gallery.image ? getImage(gallery.image.fullpath, 350) : '';
            return <div key={`gallery_${i}`}
                        onMouseEnter={() => setBgImage(image)}
                        onClick={() => history.push(`/kategoria/${gallery.path}`)}>
                <Card name={gallery.name}
                      image={image}/>
            </div>
        })
    }

    return (
        <>
            <h3>Kategórie</h3>
            <Grid>
                {galleriesRender.length > 0 ? galleriesRender : null}
                <AddCard onClick={toggleModal}/>
            </Grid>
            {showModal ? <AddCategoryModal createCategory={createCategory} onClose={toggleModal} disabled={loading}/> : null}
        </>
    );
};

export default Categories;
