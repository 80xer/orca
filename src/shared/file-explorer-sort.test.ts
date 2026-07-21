import { describe, expect, it } from 'vitest'
import { compareFileExplorerEntries, compareFileExplorerNames } from './file-explorer-sort'

describe('compareFileExplorerNames', () => {
  it('orders numbers naturally, not lexically', () => {
    expect([...['file10', 'file2', 'file1']].sort(compareFileExplorerNames)).toEqual([
      'file1',
      'file2',
      'file10'
    ])
  })

  it('is case-insensitive on base letters', () => {
    expect(compareFileExplorerNames('Apple', 'apple')).toBe(0)
  })

  it('orders Flyway-style migration versions numerically', () => {
    expect(
      ['V1_10__x.sql', 'V1_2__x.sql', 'V1_1__x.sql'].sort(compareFileExplorerNames)
    ).toEqual(['V1_1__x.sql', 'V1_2__x.sql', 'V1_10__x.sql'])
  })
})

describe('compareFileExplorerEntries', () => {
  it('puts directories before files regardless of name', () => {
    const sorted = [
      { name: 'zeta', isDirectory: false },
      { name: 'alpha', isDirectory: false },
      { name: 'mid', isDirectory: true }
    ].sort(compareFileExplorerEntries)
    expect(sorted.map((e) => e.name)).toEqual(['mid', 'alpha', 'zeta'])
  })
})
