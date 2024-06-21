/**
 * Implementation of boid algorithm, huge credits to
 * https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html
 */

import { useEffect } from 'react'

class Boid {
  constructor(
    x,
    y,
    velocityX,
    velocityY,
    radius,
    biasval = defaultBiasVal,
    group = 0,
  ) {
    this.x = x
    this.y = y
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.radius = radius
    this.biasval = biasval
    this.group = group // 0: no bias, 1: right bias, 2: left bias
  }
}

const boidRadius = 5

const turnFactor = 0.5
const visualRange = 55
const protectedRange = 15
const centeringFactor = 0.00005
const avoidFactor = 0.09
const matchingFactor = 0.1
const maxSpeed = 6
const minSpeed = 3
//const maxBias = 0.01
//const biasIncrement = 0.00004
const defaultBiasVal = 0.001
const margin = 100

const applyCoherence = boids => {
  for (let i = 0; i < boids.length; i++) {
    let xpos_avg = 0
    let ypos_avg = 0
    let neighboring_boids = 0

    for (let j = 0; j < boids.length; j++) {
      if (i !== j) {
        const dx = boids[i].x - boids[j].x
        const dy = boids[i].y - boids[j].y

        if (Math.abs(dx) < visualRange && Math.abs(dy) < visualRange) {
          const squared_distance = dx * dx + dy * dy

          if (
            squared_distance >= protectedRange * protectedRange &&
            squared_distance < visualRange * visualRange
          ) {
            xpos_avg += boids[j].x
            ypos_avg += boids[j].y
            neighboring_boids++
          }
        }
      }
    }

    if (neighboring_boids > 0) {
      xpos_avg /= neighboring_boids
      ypos_avg /= neighboring_boids

      boids[i].velocityX += (xpos_avg - boids[i].x) * centeringFactor
      boids[i].velocityY += (ypos_avg - boids[i].y) * centeringFactor
    }
  }
}

const applyAlignment = boids => {
  for (let i = 0; i < boids.length; i++) {
    let xvel_avg = 0
    let yvel_avg = 0
    let neighboring_boids = 0

    for (let j = 0; j < boids.length; j++) {
      if (i !== j) {
        const dx = boids[i].x - boids[j].x
        const dy = boids[i].y - boids[j].y

        if (Math.abs(dx) < visualRange && Math.abs(dy) < visualRange) {
          const squared_distance = dx * dx + dy * dy

          if (
            squared_distance >= protectedRange * protectedRange &&
            squared_distance < visualRange * visualRange
          ) {
            xvel_avg += boids[j].velocityX
            yvel_avg += boids[j].velocityY
            neighboring_boids++
          }
        }
      }
    }

    if (neighboring_boids > 0) {
      xvel_avg /= neighboring_boids
      yvel_avg /= neighboring_boids

      boids[i].velocityX += (xvel_avg - boids[i].velocityX) * matchingFactor
      boids[i].velocityY += (yvel_avg - boids[i].velocityY) * matchingFactor
    }
  }
}

const applySeparation = boids => {
  for (let i = 0; i < boids.length; i++) {
    let close_dx = 0
    let close_dy = 0

    for (let j = 0; j < boids.length; j++) {
      if (i !== j) {
        const dx = boids[i].x - boids[j].x
        const dy = boids[i].y - boids[j].y

        if (Math.abs(dx) < visualRange && Math.abs(dy) < visualRange) {
          const squared_distance = dx * dx + dy * dy

          if (squared_distance < protectedRange * protectedRange) {
            close_dx += dx
            close_dy += dy
          }
        }
      }
    }

    boids[i].velocityX += close_dx * avoidFactor
    boids[i].velocityY += close_dy * avoidFactor
  }
}

const repopulateBoids = boids => {
  // adjust number of birds based on canvas area
  const canvas = document.getElementById('effectsCanvas')
  const area = canvas.width * canvas.height
  const numBirdsNew = Math.floor(area / 45000) // controlling density

  // adjust velocity based on canvas size
  const boidVelocity = Math.max(
    1,
    Math.sqrt(canvas.width * canvas.height) / 4000,
  ) // divisor controls speed

  while (boids.length > numBirdsNew) {
    boids.pop()
  }

  while (boids.length < numBirdsNew) {
    const group = Math.random() < 0.5 ? 1 : 2 // assign boids to either group 1 or 2
    boids.push(
      new Boid(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.random() * boidVelocity * 2 - boidVelocity,
        Math.random() * boidVelocity * 2 - boidVelocity,
        boidRadius,
        defaultBiasVal,
        group,
      ),
    )
  }
  return boids
}

const advanceBoidSimulation = boids => {
  const canvas = document.getElementById('effectsCanvas')
  for (let boid of boids) {
    boid.x += boid.velocityX
    boid.y += boid.velocityY

    // turn around at edges
    if (boid.x < margin) {
      boid.velocityX += turnFactor
    }
    if (boid.x > canvas.width - margin) {
      boid.velocityX -= turnFactor
    }
    if (boid.y < margin) {
      boid.velocityY += turnFactor
    }
    if (boid.y > canvas.height - margin) {
      boid.velocityY -= turnFactor
    }

    // apply biases
    if (boid.group === 1) {
      // bias to right
      boid.velocityX = (1 - boid.biasval) * boid.velocityX + boid.biasval
    } else if (boid.group === 2) {
      // bias to left
      boid.velocityX = (1 - boid.biasval) * boid.velocityX - boid.biasval
    }

    // enforce min and max speeds
    const speed = Math.sqrt(
      boid.velocityX * boid.velocityX + boid.velocityY * boid.velocityY,
    )
    if (speed > maxSpeed) {
      boid.velocityX = (boid.velocityX / speed) * maxSpeed
      boid.velocityY = (boid.velocityY / speed) * maxSpeed
    }
    if (speed < minSpeed) {
      boid.velocityX = (boid.velocityX / speed) * minSpeed
      boid.velocityY = (boid.velocityY / speed) * minSpeed
    }

    // Update position
    boid.x += boid.velocityX
    boid.y += boid.velocityY
  }

  applyCoherence(boids)
  applyAlignment(boids)
  applySeparation(boids)

  return repopulateBoids(boids)
}

const drawBoids = boids => {
  const canvas = document.getElementById('effectsCanvas')
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let boid of boids) {
    context.beginPath()
    context.arc(boid.x, boid.y, boid.radius, 0, 2 * Math.PI)
    context.t
    context.fillStyle = 'rgba(0, 150, 255, 0.5)'
    context.fill()
  }
}

const initBoids = () => {
  const canvas = document.getElementById('effectsCanvas')
  const area = canvas.width * canvas.height
  let boids = []

  // adjust number of birds based on canvas area
  const numBirds = Math.min(Math.floor(area / 20000), 50) // controlling density

  // adjust velocity based on canvas size
  const boidVelocity = Math.max(
    1,
    Math.sqrt(canvas.width * canvas.height) / 4000,
  ) // divisor controls speed

  for (let i = 0; i < numBirds; i++) {
    const group = Math.random() < 0.5 ? 1 : 2 // assign boids to either group 1 or 2
    boids.push(
      new Boid(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.random() * boidVelocity * 2 - boidVelocity,
        Math.random() * boidVelocity * 2 - boidVelocity,
        boidRadius,
        defaultBiasVal,
        group,
      ),
    )
  }
  return boids
}

const CanvasEffects = () => {
  useEffect(() => {
    const canvas = document.getElementById('effectsCanvas')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    let boids = initBoids()
    const render = () => {
      boids = advanceBoidSimulation(boids)
      drawBoids(boids)
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
