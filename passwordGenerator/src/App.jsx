    import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"

function App() {
    // we have to use useState  because  we have to change states 
    // first when we click on number state should be changes that why we use useState hooks
    // similarly we use several hooks in this website
    //
       const[length,setlength]=useState(5);
        const[ numberAllow,setNumberAllow]=useState(false);
        const[characterAllow,setcharacterAllow]=useState(false);
          const[password,setpasword]=useState("");
          
       // use callback hooks use for memoization 
       //
       const passwordGenerator=useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllow){
          str+="12344567890"
        }
        if(characterAllow){
          str+="!@#$%^&*-_+=[]{}~`"
        }
          for(let i=1;i<=length;i++){
             // generate random value
                 let char= Math.floor(Math.random()*str.length+1);
                 pass += str.charAt(char);
          }
          setpasword(pass);
              
       },[numberAllow,length,setpasword,characterAllow]);
       // to run function we use useEffects hooks
       useEffect(()=>(
          passwordGenerator()
       ),[passwordGenerator,setpasword,setNumberAllow,setcharacterAllow])
       // use refhook for referece
       const passwordref=useRef(null)
       // we  can use callback  hook here for memiozation
       // but here we don't use callbackhook
       ///
       /*  here we use callback hooks for memoization 

       const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


       */
          const copyToClipBoard=()=>{
                passwordref.current?.select();
                passwordref.current?.setSelectionRange(0, 999);
               window.navigator.clipboard.writeText(password);
          }

  return (
    <>
       <div>
          <h1 className="text-white ml-9 font-bold mt-14">passwordGenerator</h1>
          <div >
               <div className="ml-9 ">
                  <input className=" rounded-lg  h-8 min-w-80 cursor-pointer border"     
                    type="text"
                    value={password}
                    readOnly
                    ref={passwordref}
                     placeholder="password_generator" />
                  <button onClick={copyToClipBoard} className=" rounded-lg bg-orange-700 h-8 
                   hover:bg-emerald-800">Copy</button>
               </div>
               <div className="flex ml-9 mt-5">
               <div className="">
                  <input type="range"
                  min={5}
                  max={30}
                    readOnly
                    value={length}
                    onChange={(e)=>{setlength(e.target.value)}}
                   />
                  <label >Length:{length}</label>
               </div>
               <div className=" flex">
                  <div className=" ">
                     <input type="checkbox"
                         onChange={()=>{
                              setNumberAllow((prev)=>!prev)
                         }}
                      />
                     <label>Numbers</label>
                  </div>
                  <div>
                    <input type="checkbox"
                    onChange={()=>{
                      setcharacterAllow((prev)=>!prev)
                    }}
                     />
                    <label> characters</label>
                  </div>
               </div>
               </div>
          </div>

       </div>
    </>
  )
}

export default App
