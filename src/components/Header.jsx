import { Upload } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand >
            <Link to={''} style={{textDecoration:'none'}} >
              <Upload color="white" size={50} />
              <span className='text-light ms-3 fs-5'> VIDEO____UPLOAD </span>
            </Link>

          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header