import React from 'react'
import { Link } from 'react-router-dom'
//css
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consiste em um blog deito com React, utilizando o Firebase como banco de dados e autenticação.</p>
      <Link to="/" className='btn'>Voltar para a Home</Link>
    </div>
  )
}

export default About