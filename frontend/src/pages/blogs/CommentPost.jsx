import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useAddCommentMutation } from '../../redux/features/comments/commentApi.js';
import { useFetchBlogByIdQuery } from '../../redux/features/blogs/blogsApi.js';


const CommentPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const { user } = useSelector(state => state.auth);
  const [addComment] = useAddCommentMutation();
  const {} = useFetchBlogByIdQuery(id, {skip:!id});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to post a comment');
      navigate('/login');
      return;
    }
    const newComment = {
      comment: comment,
      postId: id,
      user: user._id
    };
    try {
      const response = await addComment(newComment).unwrap();
      console.log(response);
      setComment(''); // Reset the comment field
      alert('Comment posted successfully');
      navigate(`/blog/${id}`);
      
    } catch (error) {
      alert('Error while posting comment');
    }
  };

  return (
    <div className='bg-slate-100 m-5 rounded-lg p-5'>
      <h3 className='text-lg font-medium mb-8'>Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Write your comment here..."
          className='w-full rounded-lg bg-slate-200 p-2'
        ></textarea>
        <button type="submit" className='mt-5 rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600'>
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentPost;