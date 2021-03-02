// import React, { ReactComponentElement } from 'react'
import React from 'react'
// import { JsxElement } from 'typescript';

const flatten = (text: string, child:React.ReactElement<any>, i:number, a:string[]):string => {
    let trash:any = i
    trash = a
    return typeof child === 'string'
      ? text + (child as string)
      //@ts-ignore
      : React.Children.toArray(child.props.children).reduce<string>(flatten, text) as string;
}
  /**
   * HeadingRenderer is a custom renderer
   * It parses the heading and attaches an id to it to be used as an anchor
   */
interface Props{
    level: number
}

export const HeadingRenderer:React.FC<Props> = (props) => {
    const children = React.Children.toArray(props.children);
      //@ts-ignore
    const text = children.reduce<string>(flatten, '');
    // console.log(text)
      //@ts-ignore
    const slug = text.toLowerCase().replace(/!|\?|\'/,'').replace(/\W/g, '-')
    // console.log(slug)

    return (<>
        <a className='anchor' id={slug}></a>
        {React.createElement('h' + props.level, {}, <>{props.children} <a className='anchor-link' href={'#'+slug}>#</a></>)}
    </>)
}
  

