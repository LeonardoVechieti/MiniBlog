import React from 'react'
//css
import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const { user } = useAuthValue()

    const {insertDocument, response} = useInsertDocument("posts")

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')
        //validar image url
        //cria arrays de tags
        //checar todos os valores
        // console.log(title, image, body, tags)

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createdBy: user.displayName,
            //createdAt: new Date().toISOString(),
            //
        })

    }

  return (
    <div className={styles.post}>
        <h2>Criar Post</h2>
        <p>Crie um novo post para o blog</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Título:</span>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    placeholder='Título do post'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                <span>Imagem:</span>
                <input
                    type="text"
                    name="image"
                    id="image"
                    required
                    placeholder='URL da imagem'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>
            <label>
                <span>Conteúdo:</span>
                <textarea
                    name="body"
                    id="body"
                    required
                    placeholder='Conteúdo do post'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </label>
            <label>
                <span>Tags:</span>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    required
                    placeholder='Tags do post'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </label>
            <button className='btn' type='submit' >Criar Post</button>
            {response.error && <p className='error'>{response.error}</p>}
        </form>

    </div>
  )
}

export default CreatePost