const path = require('path')
const fs = require('fs').promises
const fg = require('fast-glob')
const { parse } = require('vue-docgen-api')
const { pascalToKebab } = require('./case.js')
const templateComponent = require('./template-component.js')

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
  const indexDir = path.dirname(outIndex)
  const componentsDir = path.relative(indexDir, outComponents)
  const componentsRelative = componentsDir ? componentsDir + '/' : ''
  const names = components.map(({ basename, info }) => ({
    basename,
    pascal: info.displayName,
    kebab: pascalToKebab(info.displayName)
  }))
    .sort((a, b) => a.pascal.localeCompare(b.pascal))
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

async function createDocs (files, components, { outComponents }) {
  for (const component of components) {
    files.push({
      path: path.join(outComponents, component.basename),
      data: await templateComponent(files, component, { outComponents })
    })
  }
  return files
}

async function writeFiles (files, { cwd }) {
  for (const file of files) {
    const fullPath = path.join(cwd, file.path)
    const dir = path.dirname(fullPath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(fullPath, file.data)
  }
  return files
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
  await createDocs(files, components, { outComponents })
  await writeFiles(files, { cwd })
}
