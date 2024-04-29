import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {format} from 'date-fns'
import UpdatePhotoshoot from './UpdatePhotoshoot'
import Modal from 'react-modal'
//import './StyleDetailPhotoshoot.css'
import setBodyColor from '../setBodyColor'
Modal.setAppElement('#root');
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
const DetailsPhotoshoot = () => {
    setBodyColor({color: "#C2A2CB"})
    let {id} = useParams()
    const [photoshoot, setPhotoshoot]= useState([]) 
    useEffect(()=>{        
        fetch(`/photoshoots/${id}`)
        .then(r=>r.json())
        .then(data=>(
          setPhotoshoot(data)))
    }, [])

const [modalIsOpen, setIsOpen] = React.useState(false);

function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //ssubtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
        <h2 className='h2DPhotoshoot'>Here is the details of this photoshoot:</h2>
        <h3 className='h3DPhotoshoot'>{photoshoot.location}</h3>
        <h3 className='h3DPhotoshoot'>{photoshoot.date_time? format(new Date(photoshoot.date_time.replace(/-/g, '/')), 'MMMM do yyyy, h:mm a'): ""}</h3> 
        <button className='book' type='button' onClick={openModal}>Update photoshoot</button>   
        {/* {photoshoots}       */}
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <UpdatePhotoshoot photoshoot_id={photoshoot.id} />
        </Modal>
        {/* <button onClick={UpdatePhotoshoot}>Update photoshoot</button>      */}
    </div>
  )
}

export default DetailsPhotoshoot
