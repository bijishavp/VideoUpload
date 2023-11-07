import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'





function Landingpage() {
  // useNavigate is a hook

  const navigate=useNavigate()
  const handleNavigate=()=>{

      // navigate to home
      navigate('/homepage')
  }
  return (
    <div>
      <Row className='align-items-center'>

        <Col></Col>
        <Col lg={7}>

          <h1>
            WELCOME TO VIDEO.COM
          </h1>
          <p style={{textAlign:'justfy'}}>
            Where user can use their favourite videos , user can upload any Youtube videos by copy and paste their url . Videos.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop..It is free...Try it Now....!!!
          </p>
          <button onClick={handleNavigate} className="btn btn-success">Click Here to know more !!!</button>
        </Col>
        <Col lg={4}><img src="https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-video-tutorials-background-vector-illustration-png-image_4742318.png" alt="" /></Col>

        
      </Row>
    </div>
  )
}

export default Landingpage