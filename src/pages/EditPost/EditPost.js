import React from 'react'
//css
import styles from './EditPost.module.css'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useInsertDocument } from '../../hooks/useInsertDocument'

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    console.log(post);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    // fill form data
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")
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
            navigate('/home')
        }
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando Post {post.title}</h2>
                    <p>Altere os dados do post como desejar!</p>
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
                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
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
                        {!response.loading && <button className='btn' type='submit' >Alterar Post</button>}
                        {response.loading && <button className='btn' type='submit' disabled >Alterando Post...</button>}

                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}

        </div>
    )
}

export default EditPost