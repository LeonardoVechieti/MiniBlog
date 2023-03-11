import React from 'react'
import styles from './Home.module.css'

//hoks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostsDetail from '../../components/PostsDetail/PostsDetail'

//components

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const  {documents: posts, loading} = useFetchDocuments("posts")

  const handleSearch = (e) => {
    e.preventDefault();
    // navigate(`/search/${query}`)
    if (query) {
      navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes!</h1>
      <form onSubmit={handleSearch} className={styles.search_form}>
        <input type="text" placeholder="Pesquisar" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark" type="submit">Pesquisar</button>
      </form>

      <div>
        <h1>Posts</h1>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostsDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.no_results}>
            <p>Não foi encontrado Posts!</p>
            <Link className="btn" to="/register">Cadastre-se</Link>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Home