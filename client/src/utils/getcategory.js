import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import Axios from "./Axios"

const getcategory=async()=>{
   try {
     const response=await Axios({
...summaryApi.getcategory
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
export default getcategory;