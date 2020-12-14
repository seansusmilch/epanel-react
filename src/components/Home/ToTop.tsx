import React, {useState, useEffect} from 'react'
import {animateScroll as scroll} from 'react-scroll'

export const ToTop:React.FC = ()=>{

    const [display, setDisplay] = useState('none')

    useEffect(()=>{
        document.addEventListener('scroll', ()=>{
            if(window.scrollY > 20)
                setDisplay('block')
            else
                setDisplay('none')
        })

        return ()=>{
            document.removeEventListener('scroll', ()=>{
                if(window.scrollY > 20)
                    setDisplay('block')
                else
                    setDisplay('none')
            })
        }
    },[])

    return(
        <button 
            className='btn btn-lg btn-primary rounded'
            title='Go to top'
            id='totop'
            style={{
                display: display
            }}
            onClick={()=>{
                scroll.scrollToTop()
                }}>
            <img className='img-fluid' src="uparrow.png" alt=""/>
        </button>
    )
}