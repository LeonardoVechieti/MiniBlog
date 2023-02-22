import React from 'react'
//css
import styles from './Login.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      const user = {
          email,
          password,
      }


      const res = await login(user)
      console.log(user)
  }

  //Mapear os erros do firebase
  useEffect(() => {
      if (authError) {
          setError(authError)
      }
  }, [authError])

  return (
    <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça o login para utilizar o sistema!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </label>
                <button 
                type="submit" className='btn'>Cadastrar</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
  )
}

export default Login