import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import UpdatePhotoshoot from './UpdatePhotoshoot'
import Modal from 'react-modal'
import CancelPhotoshoot from './CancelPhotoshoot'
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
  setBodyColor({ color: "#C2A2CB" })
  let { id } = useParams()
  const [photoshoot, setPhotoshoot] = useState([])
  useEffect(() => {
    fetch(`/photoshoots/${id}`)
      .then(r => r.json())
      .then(data => (
        setPhotoshoot(data)))
  }, [])

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [cancelModalIsOpen, setCancelIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openCancelModal() {
    setCancelIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeCancelModal() {
    setCancelIsOpen(false);
  }

  return (
    <div>
      <h2 className='h2DPhotoshoot'>Here are the details of the photoshoot:</h2>
      <h3 className='h3DPhotoshoot'>Location: {photoshoot.location}</h3>
      <h3 className='h3DPhotoshoot'>Date and Time: {photoshoot.date_time ? format(new Date((photoshoot.date_time + 'Z').replace(/-/g, '/')), 'MMMM do yyyy, h:mm a') : ""}</h3>
      <button className='book' type='button' onClick={openModal}>Update photoshoot</button>
      <br />
      <button className='cancel' type='button' onClick={openCancelModal}>Cancel photoshoot </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update photoshoot Modal">
        <UpdatePhotoshoot photoshoot_id={photoshoot.id} />
      </Modal>
      <Modal
        isOpen={cancelModalIsOpen}
        onRequestClose={closeCancelModal}
        style={customStyles}
        contentLabel="Cancel photoshoot Modal">
        <CancelPhotoshoot photoshoot_id={photoshoot.id} />
      </Modal>
    </div>
  )
}

export default DetailsPhotoshoot
