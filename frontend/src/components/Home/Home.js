
import HomeItem from '../HomeItem/HomeItem'
import watch from '../../assets/jason-wong-Qvxw6I-D0Ak-unsplash.jpg'
import exercise from '../../assets/kike-vega-F2qh3yjz6Jk-unsplash.jpg'
import nutrition from '../../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg'
import sleep from '../../assets/aaron-burden-4eWwSxaDhe4-unsplash.jpg'
import activity from '../../assets/paico-oficial-bAA06m4O7co-unsplash.jpg'
import './Home.css'

export default function Home() {
  const items = [
    {
      name: "activity",
      image: activity
    },
    {
      name: "exercise",
      image: exercise
    },
    {
      name: "nutrition",
      image: nutrition
    },
    {
      name: "sleep",
      image: sleep
    }
  ]

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
      <div className='home-layout'>
        {items.map(item => (
          <HomeItem key={item.id} item={item}/>
        ))}
      </div>
    </div>
  )
}