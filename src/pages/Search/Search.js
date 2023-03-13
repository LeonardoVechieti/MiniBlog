import React from 'react'
//css
import styles from './Search.module.css'
//hoks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
//components
import PostsDetail from '../../components/PostsDetail/PostsDetail'

import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        {/* <p>{search}</p> */}
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
            <div className={styles.no_results}>
                <p>Não foi encontrado Posts!</p>
            </div>
        )}
        {posts && posts.map((post) => (
           <PostsDetail key={post.id} post={post} />
        ))}

    </div>
  )
}

export default Search