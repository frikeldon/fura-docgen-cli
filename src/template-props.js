module.exports = function templateProps (props) {
  return [
    '<h2>Props</h2>',
    '<table class="props">',
    '<thead>',
    '<tr>',
    '<th>Prop name</th>',
    '<th>Description</th>',
    '<th>Values</th>',
    '<th>Default</th>',
    '</tr>',
    '</thead>',
    '<tbody>',
    ...props.flatMap(prop => [
      '<tr>',
      `<td class="col-name"><code class="name">${prop.name}</code></td>`,
      '<td class="col-description">',
      `<p>${prop.description ?? ''}</p>`,
      `<div><pre class="type">${prop.type?.name ?? ''}</pre></div>`,
      '</td>',
      `<td class="col-values"><p>${prop.values?.map(pv => `<code class="value">${pv}</code>`).join(', ') ?? '-'}</p></td>`,
      `<td class="col-default"><span class="value">${prop.defaultValue?.value ?? ''}</span></td>`,
      '</tr>'
    ]),
    '</tbody>',
    '</table>'
  ]
}
