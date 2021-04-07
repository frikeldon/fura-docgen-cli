const templateProps = require('./template-props.js')
const templateMethods = require('./template-methods.js')
const templateEvents = require('./template-events.js')
const templateSlots = require('./template-slots.js')
const templateDocsBlocs = require('./template-docs-blocks.js')

module.exports = function templateComponent (files, component, { outComponents }) {
  const { info, basename } = component
  return [
    ...(info.docsBlocks ? templateDocsBlocs(files, info.docsBlocks, { outComponents, basename }) : []),
    '<template>',
    '<div class="fura">',
    `<h1>${info.displayName}</h1>`,
    '<div class="docs">',
    ...(info.props ? templateProps(info.props) : []),
    ...(info.methods ? templateMethods(info.methods) : []),
    ...(info.events ? templateEvents(info.events) : []),
    ...(info.slots ? templateSlots(info.slots) : []),
    '</div>',
    '<div',
    'v-if="$options.examples && $options.examples.length > 0"',
    'class="examples"',
    '>',
    '<h2>Examples</h2>',
    '<vue-live',
    'v-for="(example, index) in $options.examples"',
    ':key="index"',
    ':code="example"',
    ':layout="$options.CustomLayout"',
    ':editor-props="{ lineNumbers: true }"',
    '@error="handleError"',
    '/>',
    '</div>',
    '</div>',
    '</template>',
    ''
  ]
    .filter(line => typeof line === 'string')
    .join('\n')
}
