import { Fragment } from 'react/jsx-runtime'
import photos from '../src/data/photos.json'
import Photocard from './Photocard'
import PhotoModal from './PhotoModal'

function Gallery(){
    return(
        <div id='galeria' className='row g-4'>
            {photos.map(photo=>(
                <Fragment key={photo.id}>
                    <div className="col-12 col-md-6 col-lg-4">
                        <PhotoCard {...photo} />
                    </div>
                    <PhotoModal {...photo} />
                </Fragment>
            ))}
        </div>
    )
}

export default Gallery