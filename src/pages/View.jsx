import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../services/allapi'

// valu efrom home
//destructuring it
//for add to view data sharing
//when add btn clicks dat show in view page automatically without refreshing
function View({serverRes}) {
  // create state for holding  responses and sharing to other components
  // response.data is to be shared
  // we get response as an empty array so useState([])
  const [allVideos, setAllvideos] = useState([])
//aytomatically delete item instead refreshing
const[deleteStatus,setdeleteStatus]=useState(false)

const handledeleteStatus=(res)=>{

  

  setdeleteStatus(res)
  
}
  //hook used to call fn at loading page/ngonit in angular(automatic invoke when browser loading time) -- useEffect
  //content that to be executed when compomnent load give in call bck fn body 
  // value chng --array []
  useEffect(() => {
    // call bck fn body
    getallVideos()
    // destructured serverREs  give ihere for automatic invoke when browser loading time
  }, [serverRes,deleteStatus])

  // fn to make api call for get videos uploed to frond end to show
  //fn call makes an api call
  const getallVideos = async () => {

    let response = await getVideo()

    //console.log(response.data);
    // this value is needed in other components/videocard component here.. so need to hold and share

    //// to share this use setAllvideos state
    setAllvideos(response.data);
  }
  console.log(allVideos);

  return (
    <div className='border p-3 rounded ms-4'>
      <Row>
        {/* item need to be duplicate dshoulb be inside { } */}
        {

          allVideos.map(video => (<Col className='ps-3 mb-3' sm={12} md={6}>
          {/* videos inside video is stored as object card */}

          <Videocard  card={video} handledeleteStatus={handledeleteStatus}/>
          {/* used in videocard component */}

        </Col>
        )
            
          )

        }



      </Row>
    </div>
  )
}

export default View