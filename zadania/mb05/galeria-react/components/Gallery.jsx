import photos from '../src/data/photos.json'
import Photocard from './Photocard'

function Gallery(){
    return(
        <div id='galeria' className='row g-4'>
            {photos.map(photo=>(
                <div key={photo.id} className='col-12 col-md-6 col-lg-4'>
                    <Photocard {...photo}/>
                </div>
            ))}
        </div>
    )
}

export default Gallery