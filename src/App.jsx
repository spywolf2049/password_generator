import { useCallback, useEffect, useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('default password')


  //useRef hook
  const passwordRef = useRef(null)
  
  //we use callback in password generator function
  const  passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz"
     if(numberAllowed) str+="0123456789"
     if(charAllowed) str+="!@#$%^&*?"

     for(let i =1;i<=length;i++){
        let char = Math.floor(Math.random()* str.length +1)
        pass += str.charAt(char)
     }

     setPassword(pass)

  } ,[length ,numberAllowed ,charAllowed,setPassword] ) 


const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()//use to highlight the coppied text
  window.navigator.clipboard.writeText(password)
},[password])


  useEffect(()=>{
    passwordGenerator()
  },[length ,numberAllowed ,charAllowed,setPassword])


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-9 text-orange-500 bg-gray-700 text-center'>
      <h1 className='text-white text-center my-3'>Password Generator </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input type='text' 
            value={password}
            className='outline-none w-full py-3 px-3  rounded-md'
            placeholder='password'
            readOnly
            ref = {passwordRef}
     />
     <button  onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div>

    <div className='flex gap-3'>
    <div className='flex test-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type='range'
        min ={6}
        max={50}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
     </div>

     <div className='flex items-center gap-x-1'>
     
        <input 
        type='checkbox'
       defaultChecked = {numberAllowed}
        id='numberInput'
        className='cursor-pointer'
        onChange={()=>{setNumberAllowed((prev)=>!prev)

        }}
        />
        <label htmlFor='numberInput'>Numbers</label>
     
        <div className='flex items-center gap-x-1'>
     
     <input 
     type='checkbox'
    defaultChecked = {charAllowed}
     id='characterInput'
     className='cursor-pointer'
     onChange={()=>{setCharAllowed((prev)=>!prev)

     }}
     />
    <label htmlFor='characterInput'>Character</label>

     </div>
      


    </div>
    
       
        
      
     </div>

     </div>
     
    </>
  )
}

export default App
