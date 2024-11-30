import React from 'react'

const EmptyCard = ({imgSrc,message}) => {
  return (
    <div>
        <img src={imgSrc}/>
        <p>{message}</p>
    </div>
  )
}

export default EmptyCard