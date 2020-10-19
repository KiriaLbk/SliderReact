import React, { useState } from 'react';
import Img from './Img';

function Slider(){
    let sliderArr = [
        <Img src='../../assets/img/1.jpg'></Img>,
        <Img src='../../assets/img/2.jpg'></Img>,
        <Img src='../../assets/img/3.jpg'></Img>,
        <Img src='../../assets/img/4.jpg'></Img>,
        <Img src='../../assets/img/5.jpg'></Img>,
        <Img src='../../assets/img/6.jpg'></Img>
    ];
    const [x,setX] = useState(0);
    const goLeft = () => {
        (x === 0) ? setX(-100*(sliderArr.length-1)) : setX(x + 100);
    };
    const goRight = (e) => {
        (x === -100*(sliderArr.length-1)) ? setX(0) : setX(x - 100);
    };
    const goPic = (e) => {
        setX(+(e.currentTarget.getAttribute('data-column'))*-100);
    }
    return(
        <div className="slider">
            {
                sliderArr.map((item,index) => {
                    return(
                        <div data-column={index} style={{transform: `translateX(${x}%)`}} key={index} className="slide">
                            {item}
                        </div>
                    )
                })
            }
            <div id="goLeft"><img onClick={goLeft} src="../../assets/img/chev-left.png"/></div>
            <div id="goRight"><img onClick={goRight} src="../../assets/img/chev-right.png"/></div>
            <div className="check__container">
                <div className="check">
                    {
                        sliderArr.map((item,index) => {
                            return(
                                <img key={index} src="../../assets/img/circle.png" onClick={goPic} data-column={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Slider;