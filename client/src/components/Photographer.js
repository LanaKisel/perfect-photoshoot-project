import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookPhotoshoot from './BookPhotoshoot'
import Modal from 'react-modal'
import setBodyColor from '../setBodyColor'
import NewUser from './NewUser'
const customStyles = {
    content: {
        overflow: 'visible',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Photographer = () => {
    setBodyColor({ color: "#8AB3B9" })
    let { id } = useParams()
    const [photographer, setPhotographer] = useState({
        name: "",
        zip_code: "",
        profile_picture: "",
        bio: "",
        portfolio_pictures: ""
    })

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalNewUserOpen, setNewUserIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function openNewUserModal() {
        setNewUserIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    function closeNewUserModal() {
        setNewUserIsOpen(false);
    }
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URI + `/photographers/${id}`)
            .then(r => r.json())
            .then(data => setPhotographer(data))
    }, [])


    const profileSource = photographer.profile_picture.startsWith('http') ? `${photographer.profile_picture}` : `data:image/jpeg;base64,${photographer.profile_picture}`
    const photoshoots = photographer.photoshoots?.map(photoshoot => <Link key={photoshoot.id} to={`/photoshoots/${photoshoot.id}`}>{photoshoot.user.name}'s photoshoot on {(new Date(photoshoot.date_time + 'Z').toLocaleString())}<br /></Link>)
    return (
        <div className='photographer'>
            <div className='row'>
                <div className="column">
                    <img className='profile_pic' src={profileSource}></img>
                </div>
                <div className="column">
                    <h2 className='h2Ph'>{photographer.name}</h2>
                    <h3 className='h3Ph'>{photographer.bio}</h3>
                    <h3 className='h3Ph'>Zip Code: {photographer.zip_code}</h3>
                </div>
            </div>
            <div className='portfolio'>
                <h1 className='h1Ph'>Take a look at my work!</h1>
                {photographer.portfolio_pictures.split('|').map((p, i) => {
                    if (p.startsWith('http')) {
                        return <img key={'portfolio_pictures_' + i} className='portfolio_pic' src={p}></img>
                    } else {
                        return <img key={'portfolio_pictures_' + i} className='portfolio_pic' src={`data:image/jpeg;base64,${p}`}></img>

                    }
                })}
            </div>
            <button style={{ float: "right", marginRight: "100px" }} className='book' type='button' onClick={openModal}>Click to book</button>
            {photoshoots}
            <Modal
                isOpen={modalNewUserOpen}
                onRequestClose={closeNewUserModal}
                style={customStyles}
                contentLabel="New User Modal">
                <NewUser photographer_id={photographer.id} />
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Book photoshoot Modal">
                <BookPhotoshoot photographer_id={photographer.id} />
            </Modal>
        </div>
    )
}

export default Photographer 