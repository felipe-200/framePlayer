import { useEffect, useState } from "react"
import './FramePlayer.css'
import { useFormatSeconds } from '../../hooks/useFormatSeconds'
interface framePlayerProps {
  frames: Array<string>,
  fps: number
}
export const FramePlayer = (props: framePlayerProps) => {
  const arrayImg = props.frames
  const sizeArrayImg = arrayImg.length - 1
  // 
  const [numberFrame, setNumberFrame] = useState<number>(0)
  const [countTotalSecondsFrames, setCountSecondTotalSecondsFrames] = useState<number>(0)
  const [durationTotalSlide, setDurationTotalSlide] = useState<number>(0)
  const [durationFrameSecond, setDurationFrameSecond] = useState<any>()
  const [intervalCountTimeTotalFramesID, setIntervalCountTimeTotalFramesID] = useState<any>()
  const [intervalCountSecondsFramesID, setIntervalCountSecondsFramesID] = useState<any>()
  const [range, setRange] = useState<number>(0)
  const [nameButtonHandler, setNameButtonHandler] = useState<'Play' | 'Pause'>('Play')
  // 
  let framesCount = numberFrame
  let secondsCount = countTotalSecondsFrames
  // 
  const countSecondsFrame = useFormatSeconds(countTotalSecondsFrames)
  const totalDurationFrames = useFormatSeconds(durationTotalSlide)

  useEffect(() => {
    const durationTotal = sizeArrayImg / props.fps
    setDurationTotalSlide(durationTotal)
    const durationInSeconds = durationTotal / sizeArrayImg
    setDurationFrameSecond(durationInSeconds * 1000)
  }, [props.fps, sizeArrayImg])
  const playerStartCount = () => {
    // start count Frames
    const countSecondsFrames = setInterval(() => {
      if (sizeArrayImg === framesCount) {
        setNameButtonHandler('Play')
        clearInterval(countSecondsFrames)
        return
      }
      framesCount += 1
      setNumberFrame(oldValue => oldValue + 1)
    }, durationFrameSecond)
    // start count Seconds
    const countTimeTotalFrames = setInterval(() => {
      if (secondsCount === durationTotalSlide) {
        clearInterval(countTimeTotalFrames)
        return
      }
      secondsCount += 1
      setCountSecondTotalSecondsFrames(oldValue => oldValue + 1)
    }, 1000)
    //
    setIntervalCountTimeTotalFramesID(countTimeTotalFrames)
    setIntervalCountSecondsFramesID(countSecondsFrames)
  }
  const handleRange = (ev: any) => {
    // Slider
    const valueIndexRange = Number(ev.target.value)
    const compassRange = valueIndexRange / props.fps
    setRange(valueIndexRange)
    setNumberFrame(valueIndexRange)
    setCountSecondTotalSecondsFrames(compassRange)
  }
  const handlePlayFrame = () => {
    if (nameButtonHandler === 'Play') {
      if (numberFrame === sizeArrayImg) {
        setNumberFrame(0)
        setCountSecondTotalSecondsFrames(0)
      }
      playerStartCount()
      setNameButtonHandler('Pause')
      return
    }
    if (nameButtonHandler === 'Pause') {
      clearInterval(intervalCountSecondsFramesID)
      clearInterval(intervalCountTimeTotalFramesID)
      setNameButtonHandler('Play')
      return
    }
  }
  console.log({
    sizeArrayImg,
    numberFrame,
    range,
    countTotalSecondsFrames
  })
  useEffect(() => {
    setRange(numberFrame)
  }, [numberFrame])
  return (
    <div className="player_container">
      <h1>Frame Player</h1>
      <div className="player_content">
        <img width="500px" height="350px" src={arrayImg[numberFrame]} alt="Alguma Imagem" />
        <div className="range_control">
          <div className="range_count">
            <span>{countSecondsFrame}</span>
            <span>{totalDurationFrames}</span>
          </div>
          <div>
            <input type="range" onChange={handleRange} className="range" min="0" max={sizeArrayImg} value={range} />
          </div>
        </div>
      </div>
      <div className="player_control">
        <button onClick={handlePlayFrame}>{nameButtonHandler}</button>
      </div>
    </div>
  )
}