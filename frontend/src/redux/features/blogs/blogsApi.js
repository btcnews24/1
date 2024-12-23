import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include',
    }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        fatchBlogs: builder.query({
            query: ({search='', category='', location=''}) => `/blog?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blog']
        }),
        fetchBlogById: builder.query({
            query: (id) => `/blog/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `/blog/related/${id}`
        }),
        postBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/blog/create-post',
                method: 'POST',
                body: newBlog,
                credentials: 'include',
           
            })


        })  ,
        updateBlog: builder.mutation({
            query: ({id,...rest }) => ({
                url: `/blog/${id}`,
                method: 'PUT',
                body: rest,
                credentials: 'include',
           
            }),
           invalidatesTags: (result, error, {id}) => [{tupe: 'Blog', id}]

        }) ,
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, {id}) => [{tupe: 'Blog', id}]
        })



}) 

})

export const {useFatchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation} = blogApi;

