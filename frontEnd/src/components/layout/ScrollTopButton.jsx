import { useState, useEffect } from 'react'

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
        setShow(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if(!show) return null;

  return (
    <button
        onClick={() => window.scrollTo({ top:0, behavior: "smooth" })}
        className='fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg'
    >
        ↑
    </button>
  )
}

/**
 * 

  const [show,setShow] = useState(false);

  useEffect(()=>{
    const handleScroll = ()=>{
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll",handleScroll);
    return ()=> window.removeEventListener("scroll",handleScroll);
  },[]);

  if(!show) return null;

  return (
    <button
      onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
      className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg"
    >
      ↑
    </button>
  );

 * 
 */