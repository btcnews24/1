import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchBlog from './SearchBlog'
import { useFatchBlogsQuery } from '../../redux/features/blogs/blogsApi'

const Blogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });


  //get data from api
  const { data: blogs = [], error, isLoading } = useFatchBlogsQuery(query);
  console.log(blogs);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSearch = () => setQuery({ search, category })
  return (
    <div className='mt-16 container mx-auto'>
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {
        isLoading && <div>Loading...</div>
      }
      {error && <div>Error: {error.message}</div>}



      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>

        {
          blogs.map(blog => (
            <Link 
            to={`/blog/${blog._id}`}
            key={blog.id} className='shadow-md '>
              <img src={blog?.coverImg} alt="" className='w-full h-80' />
              <h2 className='text-xl p-4 '>{blog.title}</h2>
            </Link>
          ))
        }
      </div>



    </div>

  )
}

export default Blogs