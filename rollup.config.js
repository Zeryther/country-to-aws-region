const uglify = require('@lopatnov/rollup-plugin-uglify')
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/country-to-aws-region.min.js',
      name: 'countryToAwsRegion',
      format: 'umd'
    },
    plugins: [
      resolve(),
      typescript({ sourceMap: true, exclude: ["**/__tests__", "**/*.test.ts"] }),
      uglify()
    ]
  }
]
