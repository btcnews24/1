import React from 'react'
import CommentPost from './CommentPost'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux'

const CommentCard = ({comments}) => {
    const user = useSelector(state => state.auth.user)
  return (
    <div>
    <div className='my-6 mx-5 bg-slate-100 p-8'>
        <div>
            {
                comments?.length > 0 ? <div>
                    <h3 className='font-bold text-lg'>All Comments</h3>
                    <div>
                        {
                            comments.map((comment, index) => (
                                <div key={index} className='shadow-md rounded-md p-4 my-3 bg-white' >
                                     
                                    <div className='flex items-center mb-2'>
                                        <FaUserCircle className="inline-block text-3xl" />
                                        <p className='m-3 text-lg font-medium  capitalize  text-blue-600'>{comment?.user?.username}</p>
                                        
                                    </div>
                                    <p className='text-xl  text-gray-600'>{comment?.comment}</p>
                                </div>
                            ))
                        }
                    </div>
                </div> : <div className='text-lg font-medium rounded'>No comments yet</div>
            }
        </div>
        
    </div>
    <CommentPost />
    </div>
  )
}

export default CommentCard