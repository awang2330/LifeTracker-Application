
import { Link } from 'react-router-dom'
import './Nouser.css'

export default function Nouser() {
  return (
    <div className='Nouser'>
      <p>Login <Link to='/login'>here</Link> to see your activity</p>
    </div>
  )
}