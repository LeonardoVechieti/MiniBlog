import React from 'react'
//css
import styles from './PostsDetail.module.css'

import { Link } from 'react-router-dom'

const PostsDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdby}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray && post.tagsArray.map((tag) => (
                
                <Link to={`/search/${tag}`} key={tag} >
                    <span className={styles.tags}>#{tag}</span>
                </Link>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className="btn outline">Ver Post</Link>
    </div>
  )
}

export default PostsDetail