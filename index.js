const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

function isHabitablePlanet(planet) {
  const planetIsConfirmed = planet['koi_disposition'] === 'CONFIRMED'
  const planetExceedsMinLight = planet['koi_insol'] > 0.36
  const planetUnderMaxLight = planet['koi_insol'] < 1.11
  const planetIsSmallEnough = planet['koi_prad'] < 1.6

  return (
    planetIsConfirmed &&
    planetExceedsMinLight &&
    planetUnderMaxLight &&
    planetIsSmallEnough
  )
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data)
    }
  })
  .on('error', (err) => {
    console.log(err)
  })
  .on('end', () => {
    console.log(
      habitablePlanets.map((planet) => {
        const planetName = planet['kepler_name']
        return planetName
      })
    )
    console.log(`${habitablePlanets.length} habitable planets found!`)
  })
