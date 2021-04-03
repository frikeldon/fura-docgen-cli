module.exports = {
  kebabToPascal (kebab) {
    return kebab
      .replace(/^./g, found => found.toUpperCase())
      .replace(/-./g, found => found.toUpperCase()[1])
  }
}
