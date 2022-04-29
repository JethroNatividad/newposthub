import React from 'react'
import Post from './Post'

const PostList = ({ posts, loading, deletePost, currentUser }) => {
    return (
        <div className='max-w-3xl mx-3 md:mx-auto space-y-2 pt-2'>
            { loading
                ? <>
                    <Post loading={ loading } />
                    <Post loading={ loading } />
                    <Post loading={ loading } />
                    <Post loading={ loading } />

                </>
                : posts.map(post => (
                    <Post deletePost={ deletePost } key={ post._id } data={ post } user={ currentUser } />
                )) }


        </div>
    )
}

export default PostList