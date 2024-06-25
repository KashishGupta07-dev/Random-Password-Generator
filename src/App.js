import './App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';
function App() {
  const [passwordLength ,setPasswordLength] = useState(10);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState:{errors}
  } = useForm();
  // eslint-disable-next-line
  const symbols = "~`<>.,!@#$%^&*()_+:'-=[]{}|\/?";
  function changeHandler(event){
      setPasswordLength(event.target.value);
      document.getElementsByClassName('slider')?.[0].addEventListener('input', function() {
        const value = this.value;
        const min = this.min;
        const max = this.max;
        const percentage = ((value - min) / (max - min)) * 100;
        
        this.style.background = `linear-gradient(to right, violet 0%, violet ${percentage}%, gray ${percentage}%, gray 100%)`;
      });
  }
  let arrayIncluded = [];
  function submitHandler(data){
    let password = "";
    if(data.uppercase){
      arrayIncluded = [...arrayIncluded,"uppercase"];
    }
    if(data.lowercase){
      arrayIncluded = [...arrayIncluded,"lowercase"];
    }
    if(data.number){
      arrayIncluded = [...arrayIncluded,"number"];
    }
    if(data.symbol){
      arrayIncluded = [...arrayIncluded,"symbol"];
    }
    if(arrayIncluded.length === 0){
      const error = {type:"string",message:"Please Select AtLeast One CheckBox"}
      setError("password",error);
      return;
    }
    clearErrors("password");
    for(let i  = 0;i<passwordLength;i++){
      const randomIndex = Math.floor(Math.random()*arrayIncluded.length);
      if(arrayIncluded[randomIndex] === "uppercase"){
        password+=String.fromCharCode(65 + Math.floor(Math.random()*26));
      }
      if(arrayIncluded[randomIndex] === "lowercase"){
        password+=String.fromCharCode(97 + Math.floor(Math.random()*26));
      }
      if(arrayIncluded[randomIndex] === "number"){
        password+=String.fromCharCode(48+Math.floor(Math.random()*9));
      }
      if(arrayIncluded[randomIndex] === "symbol"){
        password += symbols[Math.floor(Math.random()*symbols.length)];
      }
    }
    setValue("password",password);
  }
  return (
    <div className='bg-[linear-gradient(231deg,rgba(22,6,40,1)_0%,rgba(52,28,79,1)_50%,rgba(88,7,125,1)_100%)] w-[100vw] h-[100vh]'>
      <div className='flex w-2/5 mx-auto h-full justify-center items-center'>
      <div className='flex flex-col gap-y-2 px-6 py-4 rounded-md w-full'>
          <div className='text-[#ffffff] opacity-75 uppercase tracking-[1.5px] text-center leading-5 text-lg font-bold'>Password Generator</div>
          <form onSubmit={handleSubmit(submitHandler)}>
          <div className='relative  bg-[#0B0D1B] rounded-md border-b-[0.2rem] border-solid  border-[rgb(80,48,128)] my-[1rem] mx-[0rem] pt-[0.35rem]  flex justify-between'>
              <input type='text' readOnly={true} name='password' placeholder='PASSWORD' className=" bg-transparent pt-[0.5rem] outline-none cursor-default pb-[1rem] pl-[0.75rem] font-medium text-yellow-500 placeholder:text-yellow-500 placeholder:font-medium placeholder:tracking-[1.3px] tracking-[1.3px]"
                {
                  ...register("password")
                }
              />
              {
                errors.password &&
                <span className='text-green-500 mt-1 mb-1 '>{errors.password.message}</span>
              }
             <FaRegCopy size={"25px"} className={`absolute top-4 mr-2 text-blue-600 right-0 ${getValues().password?.length > 0 ? "cursor-pointer block" : "hidden"}`} onClick={()=>{
              navigator.clipboard.writeText(getValues().password)
              toast.success("Password Copied To Clipboard")
              }}/> 
              </div>
              <div className='bg-[#0B0D1B] rounded-lg px-10 py-4 flex flex-col gap-y-5'>
              <div className='text-white text-lg font-semibold flex justify-between'>{`Password Length :`}<span className='text-yellow-400'>{passwordLength}</span></div>
              <input type="range" defaultValue={passwordLength} min={5} max={20} onChange={changeHandler} className='slider appearance-none  bg-no-repeat bg-[rgb(80,48,128)] cursor-pointer rounded-[1rem] h-2 focus:outline-none focus:outline-yellow-300'/>
              <div className='flex flex-col gap-y-2 items-start mt-4'>
              <div className="flex gap-2">
              <input type='checkbox' name='uppercase' defaultChecked={true} className={` appearance-none w-[12px] h-[12px] border-[1px] border-solid border-cyan-300 cursor-pointer relative rounded-[0.2rem] checked:bg-cyan-500 checked:before:content-['✓'] checked:before:absolute checked:before:top-[-0.35rem] checked:before:left-[-0.04rem] checked:before:font-bold checked:before:text-sm`}
                {
                  ...register("uppercase")
                }
              />
                <label htmlFor="uppercase" className="text-white text-xs font-medium ">Include Uppercase Letters</label>
              </div>
              <div className='flex flex-row gap-x-2'>
              <input type='checkbox' name='lowercase' defaultChecked={true} className={` appearance-none w-[12px] h-[12px] border-[1px] border-solid border-cyan-300 cursor-pointer relative rounded-[0.2rem] checked:bg-cyan-500 checked:before:content-['✓'] checked:before:absolute checked:before:top-[-0.35rem] checked:before:left-[-0.04rem] checked:before:font-bold checked:before:text-sm`}
                {
                  ...register("lowercase")
                }
              />
                <label htmlFor="lowercase" className="text-white text-xs font-medium ">Include Lower Letters</label>
              </div>
              <div className='flex flex-row gap-x-2'>
              <input type='checkbox' name='number' defaultChecked={true} className={` appearance-none w-[12px] h-[12px] border-[1px] border-solid border-cyan-300 cursor-pointer relative rounded-[0.2rem] checked:bg-cyan-500 checked:before:content-['✓'] checked:before:absolute checked:before:top-[-0.35rem] checked:before:left-[-0.04rem] checked:before:font-bold checked:before:text-sm`}
                {
                  ...register("number")
                }
              />
                <label htmlFor="number" className="text-white text-xs font-medium ">Include Numbers</label>
              </div>
              <div className='flex flex-row gap-x-2'>
              <input type='checkbox' name='symbol' defaultChecked={true} className={` appearance-none w-[12px] h-[12px] border-[1px] border-solid border-cyan-300 cursor-pointer relative rounded-[0.2rem] checked:bg-cyan-500 checked:before:content-['✓'] checked:before:absolute checked:before:top-[-0.35rem] checked:before:left-[-0.04rem] checked:before:font-bold checked:before:text-sm`}
                {
                  ...register("symbol")
                }
              />
                <label htmlFor="symbol" className="text-white text-xs font-medium ">Include Symbols</label>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
              <div className='text-lg font-bold text-white'>Strength : </div>
                <div className={`rounded-full h-[17px] w-[17px] ${(arrayIncluded?.length === 3 || 4) && getValues()?.password?.length>=8 ? "bg-green-500 shadow-[0px_0px_10px_0px] shadow-green-500" : "bg-red-600 shadow-[0px_0px_10px_0px] shadow-red-600" }`}></div>
              </div>
              </div>
              <input type='submit' value={"Generate Password"} className='cursor-pointer text-orange-200 text-sm font-medium bg-purple-400 rounded-md px-14 py-2  border-b-[0.3rem] border-solid border-yellow-400'/>
              </div>
          </form>
      </div>
      </div>
    </div>
  );
}

export default App;