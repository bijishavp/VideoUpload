// single rqst done ...not get post put----multiple rqst
// not each fn for all process like get/post/put etc in angular


// 1. import installed axios library pckge

import axios from "axios";


// 2. function creation for common rqst
// async--api call will be inside fn 

// 3 args passed 

//method--get/post/post/delete
// url-- 'http://localhost:4000'  where this method to take place
// body --data to process(only used in post)

//value asigned to call bck fn 4
// reqst created is used not here  so export it

export const commonRequest=async (method,url,body)=>{

    // reqst confgration in objct type(key value pair)


    let reqConfig={
        method,
        url,
        data:body,
        headers:{
            // header created (not a must)for an application here so
            "Content-Type":"application/json"
            //if a file upload is to done contenttype=multiaprt/form-data
        }
    }
    

    // 4. create axios instance  for know response

    // we get promis data as return so  response is in .then aS call baCK fn
    
    // api call done here ..whats needed for api call is defined in reqconfig..and give it as args of axios fn
   return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })
    
}
// we cant  directly api call from here
//allapi component create
// pages ..call connect to->Allapi api call load->commonreqst execute for 