import { useEffect, useState } from "react"
import './FramePlayer.css'
import { useFormatSeconds } from '../../hooks/useFormatSeconds'
import { IconPlay } from '../Icons/IconPlay'
import { IconPause } from "../Icons/IconPause"
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
  // 
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
  useEffect(() => {
    setRange(numberFrame)
  }, [numberFrame])
  console.log({
    sizeArrayImg,
    numberFrame,
    range,
    countTotalSecondsFrames
  })
  const Frame = () => {
    return (
      <img width="100%" height="350px" src={arrayImg[numberFrame]} alt="Alguma Imagem" />
    )
  }
  return (
    <div className="player_container">
      <div className="player_content">
        <Frame />
        <div className="player_footer">
          <input type="range" onChange={handleRange} className="range" min="0" max={sizeArrayImg} value={range} />
          <div className="player_control">
            <button onClick={handlePlayFrame}>
              {nameButtonHandler === 'Pause' ? (
                <span className="iconPause">{IconPause}</span>
              ) : (
                <span className="iconPlay">{IconPlay}</span>
              )}
            </button>
            <span> {countSecondsFrame}  / {totalDurationFrames} </span>
          </div>
        </div>

      </div>

    </div>
  )
}