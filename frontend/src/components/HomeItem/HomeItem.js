
import './HomeItem.css'

export default function HomeItem( {item} ) {
  return (
    <div className='HomeItem'>
      <div>{item.name}</div>
      <div className='item-img'>
        <img src={item.image} alt={`${item.image} Display`}></img>
      </div>
    </div>
  )
}