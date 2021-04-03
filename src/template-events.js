module.exports = function templateEvents (events) {
  return [
    '<h2>Events</h2>',
    '<table class="events">',
    '<tr>',
    '<th>Event name</th>',
    '<th>Description</th>',
    '<th>Properties</th>',
    '</tr>',
    ...events.flatMap(event => [
      '<tr>',
      `<td class="col-name"><code class="name">${event.name}</code></td>`,
      `<td class="col-description"><p>${event.description ?? ''}</p></td>`,
      '<td class="properties">',
      ...(event.properties?.flatMap(property => [
        '<div>',
        `<code class="name">${property.name}</code>:`,
        `<span class="type">${property.type?.names?.[0] ?? 'undefined'}</span>`,
        '-',
        `<span>${property.description}</span>`,
        '</div>'
      ]) ?? ['&nbsp;']),
      '</td>',
      '</tr>'
    ]),
    '</table>'
  ]
}
