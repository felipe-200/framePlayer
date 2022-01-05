import { useEffect, useState } from "react"
import './FramePlayer.css'

interface framePlayerProps {
  frames: Array<string>,
  fps: number
}
export const FramePlayer = (props: framePlayerProps) => {
  const arrayImg = props.frames
  const sizeArrayImg = arrayImg.length - 1
  const [nameButton, setNameButton] = useState<'Play' | 'Pause'>('Play')
  const [countImg, setCountImg] = useState(0)
  const [intervalId, setIntervalId] = useState<any>()

  const [durationTotalSlide, setDurationTotalSlide] = useState<any>()
  const [durationFrameSecond, setDurationFrameSecond] = useState<any>()

  const converterTimer = (totalTimer: number) => {
    if (totalTimer < 60) {
      return `00:${totalTimer}`
    } else {
      let newTime = totalTimer / 60
      let timeString = String(newTime).split('.')
      return `${timeString[0]}:${Math.round(Number(timeString[1]))}`
    }
  }

  useEffect(() => {
    const durationTotal = sizeArrayImg / props.fps
    setDurationTotalSlide(converterTimer(durationTotal))
    const durationInSeconds = durationTotal / sizeArrayImg
    setDurationFrameSecond(durationInSeconds * 1000)
  }, [props.fps, sizeArrayImg])
  let countQtdImg = countImg
  const playerCount = () => {
    const counter = setInterval(() => {
      if (sizeArrayImg === countQtdImg + 1) {
        clearInterval(counter)
        setNameButton('Play')
      }
      countQtdImg += 1
      setCountImg(oldValue => oldValue + 1)
    }, durationFrameSecond)
    setIntervalId(counter)
  }
  const stop = () => {
    clearInterval(intervalId)
    setNameButton('Play')
  }
  const play = () => {
    if (countImg === sizeArrayImg) {
      setCountImg(0)
    }
    playerCount()
    setNameButton('Pause')
  }
  return (
    <div className="player_container">
      <h1>Frame Player</h1>
      <div className="player_content">
        {/* <Player /> */}
        <img width="500px" height="350px" src={arrayImg[countImg]} alt="Alguma Imagem" />
        <div className="range_control">
          <div className="range_count">
            <span>00:00</span>
            <span>{durationTotalSlide}</span>
          </div>
          <div>
            <input type="range" className="range" min="0" max={sizeArrayImg} value={countImg} readOnly />
          </div>
        </div>
      </div>
      <div className="player_control">
        <button>Prev</button>
        <button onClick={nameButton === 'Play' ? play : stop}>{nameButton}</button>
        <button>Next</button>
      </div>
    </div>
  )
}