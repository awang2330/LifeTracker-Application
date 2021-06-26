
import watch from '../../assets/jason-wong-Qvxw6I-D0Ak-unsplash.jpg'
import './Home.css'

export default function Home() {
  return (
    <div className="Home"> 
      <div className='home-intro'>
        <div className='intro-blurb'>
          <span>LifeTracker</span>
          <span>Helping you take back control of your world.</span>
        </div>
        <div className='intro-img'>
          <img src={watch} alt='Person wearing watch'></img>
        </div>
      </div>
    </div>
  )
}