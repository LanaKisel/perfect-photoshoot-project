import React, { useContext } from 'react'
import { PhotographersContext } from './Context'
import DisplayPh from './DisplayPh'
import CreatePhotographer from './CreatePhotographer'
import { useParams } from 'react-router-dom'
import setBodyColor from '../setBodyColor'
import Modal from 'react-modal'
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
const PhInTheArea = () => {
  setBodyColor({ color: "#CAA0AF" })
  let { zip } = useParams()
  zip=Number(zip)
  const { photographers, setPhotographers } = useContext(PhotographersContext)

  if (!photographers || photographers.length === 0) {
    fetch(process.env.REACT_APP_API_URI + '/photographers')
      .then(r => r.json())
      .then(data => setPhotographers(data))
  }
  const photographersList = photographers.filter(photographer => !zip || photographer.zip_code === zip).map(p => <DisplayPh key={p.id} photographer={p}></DisplayPh>)


  function handleAddPhotographer(newPh) {
    setPhotographers((photographers) => [...photographers, newPh]);
  }
  //modal
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {!!zip ? (!!photographersList && photographersList.length>0 ? <h1>Here are all photographers in {zip} area!</h1>: <h1>Unfortunately no photographers found in {zip} area</h1>) : <h1>Here are all photographers!</h1>}
      <h2 className='newPh'>Are you a photographer and want to show your work?</h2>
      <button className='newPhButton' onClick={openModal}>Click here</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <CreatePhotographer onAddPh={handleAddPhotographer} />
      </Modal>
      <h2>{photographersList}</h2>
    </div>
  )
}

export default PhInTheArea
