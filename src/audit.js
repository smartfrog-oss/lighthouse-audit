const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator')
const writeFile = require('write')
const filenamifyUrl = require('filenamify-url')
const ora = require('ora')
const path = require('path')

const now = new Date()
const folderName = now.toISOString().slice(0, -5)

const { urls } = require('../config.json')

const opts = {
  chromeFlags: [
    // '--show-paint-rects'
    '--headless',
  ],
}

const config = null

async function main() {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
  opts.port = chrome.port
  await auditAll()
  await chrome.kill()
}

async function auditAll() {
  for (url of urls) {
    await auditUrl(url)
  }
}

async function auditUrl(url) {
  const spinner = ora(url).start()
  const report = await lighthouse(url, opts, config)
  const html = ReportGenerator.generateReport(report.lhr, 'html')
  writeFile(outputPath(url), html)
  spinner.succeed()
}

function outputPath(url) {
  const filename = filenamifyUrl(url)
  return path.resolve(`./reports/${folderName}/${filename}.html`)
}

main()
