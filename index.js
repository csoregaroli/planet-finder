const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
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
    console.log(habitablePlanets)
    console.log('done')
  })
