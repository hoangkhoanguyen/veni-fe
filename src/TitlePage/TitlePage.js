import React from 'react'
import './TitlePage.scss'

export const TitlePage = (props) => {
    const {titleName, backgroundImg} = props

  return (
    <div className='page-title' style={{backgroundImage:`url(${backgroundImg || 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/breadcrumb.jpg?raw=true'})`}}>
        <div className="container" >
            <h1>{titleName}</h1>
        </div>
    </div>
  )
}
