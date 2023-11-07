import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'


function Homepage() {
  // state creation for  statelifting in home childs add and view
  //state stored
//server data is type object so emty objct in state
  const [serverRes,setserverRes]=useState({})

  const handleResponse=(res)=>{


    setserverRes(res)
  }
  console.log(serverRes);

  return (

    <>
      <div>
        <div  className='d-flex justify-content-between'>
          <h1 className='text-primary ms-5 mb-5'>All Video Cards</h1>
          {/* Watch history creation */}
          <Link to={'/watch-history'} style={{textDecoration:'none',fontSize:"25px",color:'green'}}>Watch History</Link>
        </div>
        <div className='container-fluid'>
          <Row className='mt-5'>
            <Col lg={1}>
              {/* response in handleresponse is given in child compont tag here so it can be access by add component */}
              <Add handleResponse={handleResponse} />
            </Col>
            <Col lg={7}>
              <View serverRes={serverRes}/>
            </Col>
            <Col lg={4}>
              <Category/>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Homepage