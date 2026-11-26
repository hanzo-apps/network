import { expect, test } from 'vitest'
import { count, decimals, significant } from './format'

test('count groups whole numbers the en-US way', () => {
  expect(count(0)).toBe('0')
  expect(count(999)).toBe('999')
  expect(count(1000)).toBe('1,000')
  expect(count(1052729)).toBe('1,052,729')
  expect(count(2e12)).toBe('2,000,000,000,000')
})

test('count rounds to a whole number', () => {
  expect(count(1.4)).toBe('1')
  expect(count(2.5)).toBe('3')
})

test('count refuses a number that is not one', () => {
  for (const n of [NaN, Infinity, -Infinity]) expect(() => count(n)).toThrow(RangeError)
})

test('decimals shows up to the given places and drops trailing zeros', () => {
  expect(decimals(500, 5)).toBe('500')
  expect(decimals(3.90625, 5)).toBe('3.90625')
  expect(decimals(7.8125, 5)).toBe('7.8125')
  expect(decimals(1234.5, 5)).toBe('1,234.5')
  expect(decimals(0.1 + 0.2, 5)).toBe('0.3')
})

test('decimals refuses a number that is not one', () => {
  expect(() => decimals(NaN, 2)).toThrow(RangeError)
})

test('significant keeps the first digits and drops the rest', () => {
  expect(significant(500, 3)).toBe('500')
  expect(significant(62.5, 3)).toBe('62.5')
  expect(significant(7.8125, 3)).toBe('7.81')
  expect(significant(3.90625, 3)).toBe('3.91')
  expect(significant(1234567, 3)).toBe('1,230,000')
  expect(() => significant(NaN, 3)).toThrow(RangeError)
})
