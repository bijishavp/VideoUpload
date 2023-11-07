import { PlusCircle } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../services/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//share value by home component(parent) property
//destructuring response 
function Add({handleResponse}) {
  // getting values entered
  // modal in amgular
  //single state  created  for all textfield and give  args as  object values
  const [uploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""

  })
  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target
    //update value in state ie call setuploaddata
    //The JavaScript spread operator ( ... ) allows us to quickly copy all or part of an existing array or object into another array or object.
    //setuploadData({[name]:value})---one object value id at a a time is showing . all other need to show caption thumbnail etc 
    // state kerumbo aaa array il ulla ella object valuesum nem access cheyyan (...statename used)
    setuploadData({ ...uploadData, [name]: value })

  }
  //console.log(uploadData);

  // fn for extract embed url from youtube link url

  const extractUrl = (e) => {
    // url field value enters then this extractfn will be called..

    // original url we entered is saved in youtubeUrl...extract and save it int0 url in objct value 
    let youtubeUrl = e.target.value

    //https://www.youtube.com/watch?v=nFOjaKgVCl4 -- youtube original link
    //src="https://www.youtube.com/embed/nFOjaKgVCl4" -- iframe src embed url

    //extract nFOjaKgVCl4 from https://www.youtube.com/watch?v=nFOjaKgVCl4
    // https://www.youtube.com/embed/paste here...https://www.youtube.com/embed/nFOjaKgVCl4

    if (youtubeUrl.includes("v=")) {

      let index = youtubeUrl.indexOf("v=")
      //extracted end part we need
      console.log(index);

      //we not need v=  needs nFOjaKgVCl4..ie index 1 and 2 not meeded..baaki needed
      let videoUrl = youtubeUrl.substring(index + 2, index + 13)
      // we get nFOjaKgVCl4
      console.log(videoUrl);


      // save it ino obect value url

      let videoData = uploadData
      videoData.url = `https://www.youtube.com/embed/${videoUrl}`

      // statevalue updation

      setuploadData(videoData)
    }




  }

  console.log(uploadData);

  // make it asynch ..it has an api inside addvideo
  const handleAdd = async () => {

    // obct data id caption etc need to destructure

    const { id, caption, thumbnail, url } = uploadData

    // fourfield data indenkil add button active aavanm

    if (!id || !caption || !thumbnail || !url) {
      toast.warning("please fill the form completely")
    }
    else {

      // if data is filled 
      //make an api call to allapi.js for add video
      //fn call advideo is an api call
      const response = await addVideo(uploadData)
      if (response.status >= 200 && response.status < 300) {

        // console.log(response.data);
        handleResponse(response.data)
        // after uploading form needs to be unshowed
        setShow(false)
        toast.success("successfully uploaded", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      }
      else {
        toast("provide a unique id!!")
      }




    }
  }

  return (
    <>
      <div onClick={handleShow} className='btn'>
        <PlusCircle color='black' size={70} />
      </div><Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            {/*tou understand wich value is getting in console,, give name attribute and it value should  be same as args given in usestate(id,caption etc) for getting value sfro etxtfield*/}
            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading Video_Id">
              <Form.Control type="text" placeholder='Video Id' name='id' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading Video_Caption">
              <Form.Control type="text" placeholder='Video Caption' name='caption' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading Video_CoverImageUrl">
              <Form.Control type="text" placeholder='Video ImgUrl' name='thumbnail' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading Video_Link">
              <Form.Control type="text" placeholder='Video Link' name='url' onChange={extractUrl} />
            </FloatingLabel>


          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>Add</Button>
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

export default Add