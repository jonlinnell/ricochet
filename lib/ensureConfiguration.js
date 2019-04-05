const { NODE_ENV } = process.env

const requiredKeys = [
  'DB_DIALECT',
  'DB_NAME',
  'DB_URL',
  'DB_USER',
  'DEFAULT_ADMIN_PASSWORD',
  'SECRET',
]

const requiredKeysProduction = ['SSL_CERT', 'SSL_KEY']

const optionalKeys = ['DB_PASS', 'DEFAULT_URL']

const message = `
  ${'    REQUIRED SETTINGS:'.blue}
      You must set these environment variables before continuing.
  ${`    ${requiredKeys.join(', ')}`.green}
  \n
  ${'    REQUIRED SETTINGS (PRODUCTION):'.blue}
      You must set these environment variables when NODE_ENV==='production'.
  ${`    ${requiredKeysProduction.join(', ')}`.green}
  \n
  ${'    OPTIONAL SETTINGS:'.blue}
  ${`    ${optionalKeys.join(', ')}`.green}
`

const test = (keys, optional) => {
  keys.forEach((key) => {
    if (!Object.keys(process.env).includes(key)) {
      if (!optional) {
        throw new Error(`\n    Required environment variable \`${key.red}\` is not defined. Please define it before proceeding.\n${message}`)
      } else {
        console.log(`[info] The ${'optional'.underline} environment variable \`${key}\` is not set.`)
      }
    }
  })
}

module.exports = () => {
  test(requiredKeys)

  if (NODE_ENV === 'production') {
    test(requiredKeysProduction)
  }

  test(optionalKeys, true)
}
