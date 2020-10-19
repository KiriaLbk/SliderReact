import React from 'react';

function Img({src}){
    let imgStyles={
        width: 100+'%',
        height: 'auto'
    }
    return <img style={imgStyles} src={src} alt="img"></img>
}

export default Img;