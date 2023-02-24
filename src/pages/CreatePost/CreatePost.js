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
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')
        //validar image url
        try {
            new URL(image)
        }
        catch (error) {
            setFormError('URL da imagem inválida')
            return
        }
        //validar tags
        // if (tags.length < 3) {
        //     setFormError('Insira pelo menos 3 tags')
        //     return
        // }
        //separar tags
        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())
        
        //cria arrays de tags
        //checar todos os valores
        //se algum valor for vazio, retorna erro
        //se não, cria o post
        if (!title || !image || !body || !tagsArray) {
            setFormError('Preencha todos os campos')
            return
        }
        // console.log(title, image, body, tags)

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
            //createdAt: new Date().toISOString(),
            
        })
        if (!response.error) {
            navigate('/dashboard')
        }
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
            {!response.loading && <button className='btn' type='submit' >Criar Post</button>}
            {response.loading && <button className='btn' type='submit' disabled >Criando Post...</button>}
            
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </form>
           

    </div>
  )
}

export default CreatePost