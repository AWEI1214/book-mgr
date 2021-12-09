import axios from 'axios'
export const list =(type=1,page=1,size=20)=>{
  // console.log(type);
  return axios.get(
    'http://localhost:3000/inventory-log/list',
    {
      params:{
        type,
        page,
        size
      }
    }
  )
}

