// for api of all pages add/view/category

import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonrequest";
//need base url and common rqst
//api call from component arrive  here ..it is connected to commonreqst format of api call in commonrequest


//1 .api call for add videos

//common api call is define in common resqst fn..need to call it for api call execute

//automatic api call done by calling fn commonrqst {}..dffrnt reqst configuration are given as arg  (get,post,delete)

//callbck fn 
// async...bcz api call is done in commonrqstfn(common fn  for all api call ) 

//post videos done so body/content should be pass as args in calling fn

//await helps t store the api response to a variable , store to a variable is not done here.response is needed in addvideo page.. so return that 

// needed in json so export it


export const addVideo=async(body)=>{

   return await commonRequest("POST",`${BASE_URL}/videos`,body)
}

// api call for get videos

export const getVideo=async()=>{

   return await commonRequest("GET",`${BASE_URL}/videos`,"")

}
 
// api call for delete video

export const deleteVideo=async(id)=>{
   return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

// api call for add categories
//posting is done

export const addCategories=async(body)=>{

   return await commonRequest("POST",`${BASE_URL}/category`,body)

}
// api call fn get all category
export const getCategory=async()=>{

  return await commonRequest("GET",`${BASE_URL}/category`,"")

}

// api call for delete category
// id is the key  used to fetch data related with category
export const deleteCategory=async(id)=>{

  return await commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}

// get history call

export const getHistory=async()=>{

   return await commonRequest("GET",`${BASE_URL}/watch_history`,"")
 
 }

 // add history
 export const addHistory=async(body)=>{

   return await commonRequest("POST",`${BASE_URL}/watch_history`,body)
 
 }
 // api call for get  single videos for drag and drop

export const getvideo=async(id)=>{

   return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")

}
  
// update category
export const updateCategory=async(id,body)=>{
   return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
}