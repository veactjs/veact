/**
 * @module veact.logger
 * @author Surmon <https://github.com/surmon-china>
 */

const VEACT_NAME = 'veact'

export const logger: Console = {
  ...console,
  log(...args: any) {
    console.log(`[${VEACT_NAME}]`, ...args)
  },
  warn(...args: any) {
    console.warn(`[${VEACT_NAME}]`, ...args)
  },
  error(...args: any) {
    console.error(`[${VEACT_NAME}]`, ...args)
  },
}
