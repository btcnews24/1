import React from 'react'
import { useParams } from'react-router-dom'
import BlogCard  from './BlogCard'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi'
import CommentCard from '../CommentCard'
import RelatedBlog from '../singleblog/RelatedBlog'

const SingleBlog = () => {
    const { id } = useParams()
    const {data: blog,error,isLoading} = useFetchBlogByIdQuery(id);
    console.log(blog);

  return (
    <div className='text-primary container mx-auto'>
       <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {
            blog?.post && (
                <div className='flex flex-col lg:flex-row justify-between justify-start md:gap-8 '>
                    <div className='lg:w-2/3 w-full'>
                        <BlogCard blog={blog.post} />
                        <CommentCard  comments={blog?.comments} />
                    </div>
                    <RelatedBlog/>
                </div>
            )
        }
       </div>
    </div>
  )
}

export default SingleBlog