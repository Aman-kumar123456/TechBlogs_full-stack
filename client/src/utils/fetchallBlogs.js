import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi.js"
import Axios from "./Axios.js"

const fetchAllBlogs=async()=>{
    try {
        const response=await Axios({
            ...summaryApi.getblogs
        })
         if (response.data.error ){
        toast.error(response.data.message);
      }
      if(response.data.success){
        return response.data
      }
    } catch (error) {
        console.log(error)
    }
}

export default fetchAllBlogs;