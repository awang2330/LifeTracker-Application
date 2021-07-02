import { Link } from 'react-router-dom'
import './HomeItem.css'

export default function HomeItem( {item} ) {
  return (
    <div className='HomeItem'>
      <div>{item.name}</div>
      <div className='item-img'>
        <Link to={`${item.name}`}>
          <img src={item.image} alt={`${item.image} Display`}></img>
        </Link>
      </div>
    </div>
  )
}