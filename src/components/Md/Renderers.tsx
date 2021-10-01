// import React, { ReactComponentElement } from 'react'
import React from 'react'
import { isMobile } from 'react-device-detect';
// import { JsxElement } from 'typescript';

const flatten = (text: string, child:React.ReactElement<any>, i:number, a:string[]):string => {
    let trash:any = i
    trash = a + trash
    // const cast = <string>child
    //@ts-ignore 
    return typeof child === 'string' ? text + child as string : React.Children.toArray(child.props.children).reduce<string>(flatten, text) as string;
}
  /**
   * HeadingRenderer is a custom renderer
   * It parses the heading and attaches an id to it to be used as an anchor
   */
interface HeadingProps{
    level: number
}

export const HeadingRenderer:React.FC<HeadingProps> = (props) => {
    const children = React.Children.toArray(props.children);
      //@ts-ignore
    const text = children.reduce<string>(flatten, '');
    // console.log(text)
      //@ts-ignore
    const slug = text.toLowerCase().replace(/!|\?|'/,'').replace(/\W/g, '-')
    // console.log(slug)

    return (<>
        <a className='anchor' id={slug}></a>
        {React.createElement('h' + props.level, {}, <>{props.children} <a className='anchor-link' href={'#'+slug}>#</a></>)}
    </>)
}

interface ImgProps {
    alt?: string,
    src?: string,
    title?: string
}

export const ImageRenderer:React.FC<ImgProps> = (props) => (
    <a href={props.src}>
        <img className='img-fluid rounded mx-0'
            alt={props.alt} 
            src={props.src} 
            title={props.title} 
            style={isMobile?{ maxHeight: '50vh'}:{ maxWidth: '50vw'}}  
        />
    </a>
    )

/**
 * <a href="docs/tvlogin.webp">
    <img src="docs/tvlogin.webp" class="img-fluid rounded mx-auto d-block" alt=""></a>
 */