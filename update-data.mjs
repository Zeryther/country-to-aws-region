import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import Stream from 'stream'

const __dirname = path.resolve();

(async () => {
  console.log('Fetching data...')

  const url = 'https://raw.githubusercontent.com/turnkeylinux/aws-datacenters/master/output/countries.index'

  // fetch url data to local file
  const response = await fetch(url)
  const data = await response.text()
  const filePath = path.join(__dirname, 'countries.index')
  fs.writeFileSync(filePath, data)

  // read every line from countries.index, separate by semicolon, remove the second item, log to console
  const instream = fs.createReadStream(path.join(__dirname, 'countries.index'))
  const outstream = new Stream()
  const rl = readline.createInterface(instream, outstream)

  console.log('Parsing data...')

  const countryRegionData = {}

  for await (const line of rl) {
    const lineData = line.split(';')

    const countryCode = lineData[0]

    let regions = []

    const primaryRegion = lineData[2]

    if (primaryRegion) {
      regions.push(primaryRegion)
    }

    const secondaryRegionsString = lineData[3]

    if (secondaryRegionsString !== 'None') {
      regions = secondaryRegionsString.split(',')
    }

    // make sure regions are unique
    regions = [...new Set(regions)]

    countryRegionData[countryCode] = regions
  }

  // write data to file
  console.log('Writing data...')

  const dataFilePath = path.join(__dirname, 'src', 'data.ts')
  fs.writeFileSync(dataFilePath, '// AUTO-GENERATED DATA\n// This file should only be updated with the `npm run update-data` command.\n\nexport const countryRegionData: Record<string, string[]> = ' + JSON.stringify(countryRegionData, null, 4))

  console.log('Done! Data written to src/data.json')
})()
