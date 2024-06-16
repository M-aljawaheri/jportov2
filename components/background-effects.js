import { useEffect } from 'react'

const CanvasEffects = () => {
  useEffect(() => {
    const canvas = document.getElementById('effectsCanvas')
    const context = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const radius = 20
    let x = radius * 2
    let y = canvas.height / 2
    let speedX = 10
    let speedY = 5

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.beginPath()
      context.arc(x, y, radius, 0, 2 * Math.PI)
      context.fillStyle = 'rgba(0, 150, 255, 0.5)'
      context.fill()

      x += speedX
      y += speedY
      if (x - radius > canvas.width || x - radius < 0) {
        // x = -radius
        speedX = -speedX
      }
      if (y - radius > canvas.height || y - radius < 0) {
        // x = -radius
        speedY = -speedY
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return null
}

export default CanvasEffects
