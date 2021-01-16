import React, {useState, useEffect} from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {ChevronDoubleUp} from 'react-bootstrap-icons'
import './ToTop.sass'

export const ToTop:React.FC = ()=>{

    const [display, setDisplay] = useState('none')

    const onScroll = ()=>{
        if(window.scrollY > 20)
            setDisplay('flex')
        else
            setDisplay('none')
    }

    useEffect(()=>{
        document.addEventListener('scroll', onScroll)

        return ()=>{
            document.removeEventListener('scroll', onScroll)
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
            {/* <img className='img-fluid' src="uparrow.png" alt=""/> */}
            <ChevronDoubleUp 
                color='black' 
                className='m-0 p-0 align-self-center' 
                size={25} />
        </button>
    )
}