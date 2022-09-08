import React from 'react'
import './BlogRecommend.scss'

export const BlogRecommend = (props) => {
    const {data} = props
    return (
        <div  className="blog-recommend-container">
            <img className='w-100' src={data.image} alt="" />
            <a href={data.link} className="blog-title">{data.name}</a>
            <p className="blog-desc">{data.desc}</p>
        </div>
    )
}
