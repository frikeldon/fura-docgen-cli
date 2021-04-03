#!/usr/bin/env node
const path = require('path')
const docgen = require('../src/docgen.js')

const configPath = path.join(process.cwd(), 'docgen.config.js')
const config = require(configPath)

docgen(config)
