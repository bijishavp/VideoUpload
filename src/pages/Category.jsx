import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategories, deleteCategory, getCategory, getvideo, updateCategory } from '../services/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'feather-icons-react/build/IconComponents';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';

function Category() {

  const [show, setShow] = useState(false);

  // state for category adding
  const [categoryItem, setCategoryItem] = useState({ id: "", categoryname: "", allvideos: [] });
  //state for getting categories  for using it further in frond end to show in div
  const [allCategory, setallCategory] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  // fn for get category

  const getCategoryList = async () => {

    const response = await getCategory()
    //console.log(response.data);
    //assign resonse to state ie use fn of state 
    setallCategory(response.data)
  }
  //to know value is get in state
  console.log(allCategory);
  // fetch all categories when  page load 


  useEffect(() => {

    getCategoryList()

  }, [])




  // fn for calling api
  const addCategoryForm = (e) => {

    //fn calling api
    const { name, value } = e.target
    setCategoryItem({ ...categoryItem, [name]: value })


  }

  console.log(categoryItem);

  //define fn in onclick in trash2 ... call for api to delete inside

  const hanldeDeletecategory = async (e, id) => {

    e.preventDefault()
    console.log(id);

    await deleteCategory(id)
    // after deleting an id data...other dsata to show in front end
    getCategoryList()
  }
  const handleAddcategory = async (e) => {

    // auto refresh
    e.preventDefault()
    const { id, categoryname } = categoryItem
    if (!id || !categoryname) {

      toast.warning("please fill the form completely")

    }
    else {

      const response = await addCategories(categoryItem)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {



        // after uploading form needs to be unshowed
        setShow(false)
        toast.success("New category successfully uploaded", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

        //get ctaegory show  in frond end auto than refreshing
        getCategoryList()
      }
      else {
        //toast("provide a unique id!!")
        toast.warning("provide a unique id!!")
      }
    }


  }

  // fn drag

  const dragOver = (e) => {

    // load automatically while drag nd drop
    e.preventDefault()
    console.log("dragging over the category board !!!!!");

  }

  //  fn drop
  const dropped = async (e, categoryId) => {

    console.log("dropped category id", categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("source card ID is ", sourceCardId);

    // logic to implement adding by drag an drop card in the given category
    // getting all data related to that video card
    //let response =  await getvideo(sourceCardId)
    // console.log(response);
    // we get dragged video card data,,then destructure it
    let { data } = await getvideo(sourceCardId)

    console.log("source video data", data);
    
    // == or === and != or !==
    let selectCategory = allCategory.find(item => item.id === categoryId)

    // we get dropped category details(video dragged and dropped in to category)
    console.log("target category details", selectCategory);

    //this data is tobe inserted to "allvideos":[] in category backend array
    // push to array
    selectCategory.allvideos.push(data)
    console.log("upadted target category details",selectCategory);
   await updateCategory(categoryId,selectCategory)
   //after updating we need to auto  new page with updation
   getCategoryList()

  }


  return (
    <>
      <div className='d-grid'>
        <div className='btn btn-dark m-2' onClick={handleShow}>
          Add Categories

        </div>

      </div>

      {/* allcategory display ...value  in jsx to html jsx-html {} */}

      {

        allCategory?.map(item => (
          <div>
            {/* // data is in item now
            // darg itrm is drop here looking category id */}
            <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)}
              className='d-flex justify-content-between border rounded mt-2 p-3'  >
              {/* categoryname */}
              <h5>{item?.categoryname}</h5>
              <span onClick={e => hanldeDeletecategory(e, item?.id)}><Trash2 color='red' /></span>
              {/* dropped card shown in category div */}
              <Row>
                {
                  // allvideos data saves to card so videos dragge and dropped is in card variable now
                  item.allvideos.map((card)=>(
                    <Col className='p-3 mb-1 sm{12}'>
                      {/*video card is shown by videocard selectors applying card where  dropped video card saved  */}
                      {/* trash in card not needed in vdeo card inside category div while dropped*/}
                      <Videocard card={card} insidecategory={true}/>

                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        ))
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >


        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
            <Form.Control type="text" placeholder='Id' name='id' onChange={addCategoryForm} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' controlId="floatingCaption" label="Category">
            <Form.Control type="text" name='categoryname' onChange={addCategoryForm} placeholder='Category' />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddcategory}>ADD</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />

    </>
  )
}

export default Category