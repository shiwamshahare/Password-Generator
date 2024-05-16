import React, { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'



function App() {
  const [length, setLength] = useState(6)
  const [numbers, setNumbers] = useState(false)
  const [spChars, setSpChars] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz"
    if (numbers) str += "0123456789"
    if (spChars) str += "`~!@#$%^&*_+-={}[]"
    
    for (let i = 1; i <=length; i++) {
      let gen = Math.floor(Math.random() * str.length + 1) 
      pass += str.charAt(gen) 
    }
    setPassword(pass)
  }, [length, numbers, spChars, setPassword])

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  })
  
  useEffect(() => {
    passwordGenrator()
  },[length, numbers, spChars, passwordGenrator])


  return (

    <div className='my-56 rounded-xl max-w-lg mx-auto px-1 py-2.5 bg-gray-600'>
      <h1 className='text-white text-center text-3xl'>Password Genrator</h1>
      <div className='flex justify-center items-center gap-3'>
        <input type="text" value={password} className='rounded-md outline-none px-1 py-1' placeholder='password' readOnly ref={passwordRef}/>
        <button className='rounded-lg bg-black mb-2 my-2 p-2.5 uppercase text-teal-500 cursor-pointer' onClick={copyPass}>copy</button>
      </div>
      <div className='flex justify-center text-lime-400 gap-3'>
        <div className='flex justify-center gap-x-1'>
          <input type="range" min={6} max={32} value={length} onChange={(e) => {
            setLength(e.target.value)
          }}/>
          <label>Length : { length}</label>
        </div>
        <div className=' flex justify-center gap-x-1'>
          <input type="checkbox" id='numberInput' onChange={() => {
            setNumbers((prev)=>!prev)
          }}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className=' flex justify-center gap-x-1'>
          <input type="checkbox" id='spCharInput' onChange={() => {
            setSpChars((prev)=>!prev)
          }}/>
          <label htmlFor="spCharInput">Special Characters</label>
        </div>

      </div>
    </div>

  )
}

export default App