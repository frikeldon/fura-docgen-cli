const path = require('path')

module.exports = function templateDocsBlocs (files, docsBlocks, { outComponents, basename }) {
  const basenameExample = basename.replace(/vue$/, '.examples.js')
  files.push({
    path: path.join(outComponents, basenameExample),
    data: `export default ${JSON.stringify(docsBlocks, null, 2)}`
  })
  return [
    '<script>',
    "import furaVue from 'fura-vue'",
    "import CustomLayout from '../custom-layout.vue'",
    `import examples from './${basenameExample}'`,
    '',
    'export default {',
    'methods: {',
    'handleError (error) {',
    'console.error(error)',
    '}',
    '},',
    'CustomLayout,',
    'examples,',
    "requires: { 'fura-vue': furaVue }",
    '}',
    '</script>'
  ]
}
