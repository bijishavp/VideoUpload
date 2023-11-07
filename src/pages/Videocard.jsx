import { Trash2 } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { addHistory, deleteVideo } from '../services/allapi';



import { v4 as uuidv4 } from 'uuid';


// destructurinbg {items}
function Videocard({ card, handledeleteStatus ,insidecategory}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // async...addhistory api call inside this  handleShow fn
  const handleShow = async() => {
    setShow(true);
    //video detail to be get when modal of video is shown --- watchhistory keeping

    // automatic id generating library
    const uId = uuidv4();
    console.log(uId);
    let cardTime = new Date()
    console.log(cardTime);


    //destructuring needed data from backend of videos
    const { caption, url } = card
// != or !== same
    if (uId!=="" && caption!=="" && url!=="" && cardTime!=="") {

      // to pass body for  api call to addhistory
      // create  body
      const body = {
        id:uId,
        cardName:caption,
        url,
        date:cardTime

      }
      //api call
     const response= await addHistory(body)
     console.log(response);


    }
    
  }


  // fn for deleting video

  const removeItem = async (id) => {

    // make call to allapi for invoking deletevideo fn

    let response = await deleteVideo(id)
    //  console.log(response);
    if (response.status >= 200 && response.status < 300) {

      handledeleteStatus(true)

    }

  }
  //fn for dragging card

  const dragStarted=(e,id)=>{

    console.log("drag started & source card id : ",id);
    // id is made to transferring 
    e.dataTransfer.setData("cardId",id)

  }

  return (
    <>
      <div>

{/* dragging card for drag and drop */}
        <Card draggable onDragStart={e=>dragStarted(e,card?.id)} 
         className='shadow' >
          <Card.Img variant="top" height={'200px'} src={card?.thumbnail} onClick={handleShow} />
          <Card.Body>
            <Card.Title ><span>{card?.caption}</span></Card.Title>
          {

            // insidecatgry true--trsh not shown(category.jsx--droppable--insidcatgry it true) ....false---show trash
            insidecategory?"":
            <Trash2 color='red' style={{ float: 'right' }} onClick={() => removeItem(card?.id)} />
          }
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{card?.caption}</Modal.Title>
          </Modal.Header>
          <Modal.Body><iframe width="466" height="400" src={`${card?.url}?autoplay=1`} title="Balam Pichkari Full Song Video Yeh Jawaani Hai Deewani"></iframe></Modal.Body>

        </Modal>

      </div>
    </>
  )
}

export default Videocard