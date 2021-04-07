module.exports = {
  kebabToPascal (kebab) {
    return kebab
      .replace(/^./g, found => found.toUpperCase())
      .replace(/-./g, found => found.toUpperCase()[1])
  },
  pascalToKebab (pascal) {
    return pascal
      .replace(/([A-Z])/g, '-$1')
      .replace(/^-/, '')
      .toLowerCase()
  }
}
