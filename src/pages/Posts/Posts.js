import React from 'react'
//css
import styles from './Posts.module.css'
//hoks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Posts = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id)
    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando...</p>}
            {post && (
                <div className={styles.post}>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray && post.tagsArray.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                        
                    </div>
                </div>
            )}

        </div>
    )
}

export default Posts