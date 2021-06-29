
import HomeItem from '../HomeItem/HomeItem'
import watch from '../../assets/jason-wong-Qvxw6I-D0Ak-unsplash.jpg'
import fitness from '../../assets/kike-vega-F2qh3yjz6Jk-unsplash.jpg'
import food from '../../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg'
import rest from '../../assets/aaron-burden-4eWwSxaDhe4-unsplash.jpg'
import planner from '../../assets/paico-oficial-bAA06m4O7co-unsplash.jpg'
import './Home.css'

export default function Home() {
  const items = [
    {
      name: "Planner",
      image: planner
    },
    {
      name: "Fitness",
      image: fitness
    },
    {
      name: "Food",
      image: food
    },
    {
      name: "Rest",
      image: rest
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