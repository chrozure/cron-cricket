import { useNavigate } from 'react-router-dom'
import Cricket from '../components/Cricket'
import './Home.css'

export default function Home() {
  const nav = useNavigate()

  return (
    <div className="home">
      <div className="home-hero">
        <Cricket size={160} chirping={false} />
        <h1 className="home-title">Cron Cricket</h1>
        <p className="home-subtitle">Learn to write cron expressions, one chirp at a time.</p>
      </div>

      <div className="home-buttons">
        <button className="home-btn btn-learn" onClick={() => nav('/tutorial')}>
          What is cron?
        </button>

        <button className="home-btn btn-play" onClick={() => nav('/levels')}>
          Play levels
        </button>

        <button className="home-btn btn-practice" onClick={() => nav('/practice')}>
          Free practice
        </button>
      </div>
    </div>
  )
}
