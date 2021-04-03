const path = require('path')
const fg = require('fast-glob')
const { parse } = require('vue-docgen-api')
const { kebabToPascal } = require('./case.js')

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

function createComponentIndex (files, components, { outIndex, outComponents }) {
  const names = components.map(({ basename, info }) => ({
    basename,
    kebab: info.displayName,
    pascal: kebabToPascal(info.displayName)
  }))
  const indexDir = path.dirname(outIndex)
  const componentsDir = path.relative(indexDir, outComponents)
  const componentsRelative = componentsDir ? componentsDir + '/' : ''
  files.push({
    path: outIndex,
    data: [
      ...names.map(({ pascal, basename }) => `import ${pascal} from './${componentsRelative}${basename}'`),
      '',
      `export const components = { ${names.map(({ pascal }) => pascal).join(', ')} }`,
      '',
      `export const names = ${JSON.stringify(names.map(({ kebab, pascal }) => ({ kebab, pascal })))}`,
      ''
    ].join('\n')
  })
}

module.exports = async function docgen ({
  cwd = process.cwd(),
  globComponents = '**/*.vue',
  outIndex = 'components.js',
  outComponents = './'
} = {}) {
  const files = []
  const components = await readComponents({ globComponents, cwd })
  await createComponentIndex(files, components, { outIndex, outComponents })
}
