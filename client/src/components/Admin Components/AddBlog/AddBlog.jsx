import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AddBlog() {
  const backendLink = useSelector((state) => state.prod.link);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [newCategory, setnewCategory] = useState("");
  const [Actualcategory, setActualCategory] = useState([]);
  const [CategoryId, setCategoryId] = useState("");
  const handleaddblog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("image", image);
      form.append("category", CategoryId)
      const res = await axios.post(`${backendLink}/api/admin/addblog`, form, {
        withCredentials: true
      });
      toast.success(res.data.message);

    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setTitle("");
      setDescription("");
      setLoading(false);
      setCategoryId("");
    }

  }










  const handleCategorysubmit = async (e) => {
    e.preventDefault();
    try {
      // const title=newCategory;
      const res = await axios.post(`${backendLink}/api/category/addcategory`, { title: newCategory }, {
        withCredentials: true
      });
      toast.success(res.data.message);
      setnewCategory("");
    } catch (error) {
      toast.error(error.response.data.error);

    }
  }


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/category/getcategory`, {
        withCredentials: true
      }
      );
      setActualCategory(res.data.categories)
    }
    fetch();
  }, [backendLink])
  return (

    <div className='m-4 h-screen'>
      <div className='bg-white p-4 rounded shadow-md '>
        <h1 className='text-2xl font-semibold'>      AddBlog
        </h1>
        <form action="" onSubmit={handleaddblog} className='my-4 flex flex-col gap-4'>
          <input type='text' placeholder='Title' className=' outline-none p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold'
            value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea type='text' placeholder='Description' className=' outline-none p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold'
            value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className='flex items-center justify-between'><input type='file' className='bg-blue-400 text-xl text-white rounded ' accept='.jpeg, .png, .jpg' onChange={(e) => setImage(e.target.files[0])} />
            <select name='title' id="" className='px-4 py-2 rounded shadow bg-white border ' onChange={(e) => setCategoryId(e.target.value)}>
              {
                Actualcategory && Actualcategory.map((option, index) =>

                  <option value={option.title} key={index} >{option.title}</option>



                )
              }
            </select>
          </div>
          <div>
            {loading ? <div type='submit' className='bg-zinc-500  transition-all duration-300 text-white rounded px-4 py-2 shadow-xl '
            >Adding Blogs.....</div> : <button type='submit' className='bg-zinc-900 hover:bg-zinc-700 transition-all duration-300 text-white rounded px-4 py-2 shadow-xl '
            >Add Blog</button>}


          </div>
        </form>
      </div>




      {/* <hr /> */}
      <div className='bg-white p-4 rounded shadow-md my-4'>
        <h1 className='text-2xl font-semiblod'>Add new Category</h1>
        <form className='mt-4' onSubmit={handleCategorysubmit}>
          <input type='text' placeholder='Your new Category' className='bg-none border outline-none px-4 py-2 rounded bg-white' required
            value={newCategory}
            onChange={(e) => setnewCategory(e.target.value)} />
          <button type='submit' className='ms-4 bg-zinc-900 py-2 px-4 rounded text-white'>Add Category</button>
        </form>
      </div>







    </div>
  )
}

export default AddBlog


