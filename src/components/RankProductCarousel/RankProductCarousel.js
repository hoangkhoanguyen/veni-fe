import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './RankProductCarousel.scss'

export const RankProductCarousel = (props) => {
    const {data} = props
    
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        loop: true,
        navText: ["<", ">"],
        smartSpeed: 1000,
        items: 1
      };
  return (
    <div className=' rank-product-container'>
        <h4>{data.rankType}</h4>
        <OwlCarousel className="slider-items owl-carousel " {...options}>
            {data && data.productList && data.productList.length > 0 && data.productList.map((item, index) => {
                return index % 3 == 0 && <div className="item" key={item.id}>
                    <ul>
                        <li>
                            <a href="">
                                <img src={item.image} alt="" />
                                <div className="desc">
                                    <p className="name">{item.name}</p>
                                    <p className='price'>${item.price}</p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <img src={data.productList[index + 1].image} alt="" />
                                <div className="desc">
                                    <p className="name">{data.productList[index + 1].name}</p>
                                    <p className='price'>${data.productList[index + 1].price}</p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <img src={data.productList[index + 2].image} alt="" />
                                <div className="desc">
                                    <p className="name">{data.productList[index + 2].name}</p>
                                    <p className='price'>${data.productList[index + 2].price}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            })}
        </OwlCarousel>
    </div>
  )
}
