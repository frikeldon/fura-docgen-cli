module.exports = function templateSlots (slots) {
  return [
    '<h2>Slots</h2>',
    '<table class="slots">',
    '<tr>',
    '<th>Slot</th>',
    '<th>Description</th>',
    '<th>Bindings</th>',
    '</tr>',
    ...slots.flatMap(slot => [
      '<tr>',
      `<td class="col-name"><code class="name">${slot.name}</code></td>`,
      `<td class="col-description"><p>${slot.description ?? ''}</p></td>`,
      '<td class="bindings">',
      ...(slot.bindings?.flatMap(binding => [
        '<div>',
        `<code class="name">${binding.name}</code>:`,
        `<span class="type">${binding.type?.name}</span>`,
        '-',
        `<span>${binding.description}</span>`,
        '</div>'
      ]) ?? ['&nbsp;']),
      '</td>',
      '</tr>'
    ]),
    '</table>'
  ]
}
