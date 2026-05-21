import axios from "axios";
import summaryApi, { baseURL } from "../common/summaryApi";
const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

//sending access token in the header
Axios.interceptors.request.use(
    async(config)=>{
        const accesstoken = localStorage.getItem('accesstoken')

        if(accesstoken){
            config.headers.Authorization = `Bearer ${accesstoken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//extend the life span of access token with 
// the help refresh
Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originRequest = error.config 

        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true

            const refreshtoken = localStorage.getItem("refreshtoken")

            if(refreshtoken){
                const newAccessToken = await refreshAccessToken(refreshtoken)

                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        
        return Promise.reject(error)
    }
)


const refreshAccessToken = async(refreshtoken)=>{
    try {
        const response = await Axios({
            ...summaryApi.refreshToken,
            headers : {
                Authorization : `Bearer ${refreshtoken}`
            }
        })

        const accesstoken = response.data.data.accessToken
        localStorage.setItem('accesstoken',accesstoken)
        return accesstoken
    } catch (error) {
        console.log(error)
    }
}

export default Axios