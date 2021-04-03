const path = require('path')
const fg = require('fast-glob')
const { parse } = require('vue-docgen-api')

async function readComponents ({ globComponents, cwd }) {
  const componentPaths = await fg(globComponents, { cwd })
  const components = []
  for (const componentPath of componentPaths) {
    const basename = path.basename(componentPath)
    const fullComponentPath = path.join(cwd, componentPath)
    const componentInfo = await parse(fullComponentPath)
    components.push({
      basename,
      path: componentPath,
      info: componentInfo
    })
  }
  return components
}

module.exports = async function docgen ({
  cwd = process.cwd(),
  globComponents = '**/*.vue',
  outIndex = 'components.js',
  outComponents = './'
} = {}) {
  const components = await readComponents({ globComponents, cwd })
}
