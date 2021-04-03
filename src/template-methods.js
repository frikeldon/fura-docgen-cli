module.exports = function templateMethods (methods) {
  return [
    '<h2>Methods</h2>',
    '<table class="methods">',
    '<tr>',
    '<th>Method name</th>',
    '<th>Description</th>',
    '<th>Parameters</th>',
    '</tr>',
    ...methods.flatMap(method => [
      '<tr>',
      `<td class="col-name"><code class="name">${method.name}()</code></td>`,
      '<td class="col-description">',
      `<p>${method.description ?? ''}</p>`,
      method.returns?.type?.name ? `<div>Returns: <span>${method.returns?.type?.name}</span></div>` : '',
      '</td>',
      '<td class="parameters">',
      ...method.params.flatMap(param => [
        '<div>',
        `<code class="name">${param.name}</code>:`,
        `<span class="type">${param.type?.name}</span>`,
        '-',
        `<span>${param.description}</span>`,
        '</div>'
      ]),
      '</td>',
      '</tr>'
    ]),
    '</table>'
  ]
}
