const explorerNameCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
})

function parseMigrationVersion(name: string): number[] | null {
  const match = /^V(\d+(?:[._]\d+)*)__/i.exec(name)
  if (!match) {
    return null
  }

  return match[1].split(/[._]/).map((part) => Number(part))
}

function compareVersionParts(a: number[], b: number[]): number {
  const length = Math.max(a.length, b.length)

  for (let i = 0; i < length; i += 1) {
    const left = a[i]
    const right = b[i]

    if (left === undefined) {
      return -1
    }
    if (right === undefined) {
      return 1
    }
    if (left !== right) {
      return left - right
    }
  }

  return 0
}

export function compareFileExplorerNames(a: string, b: string): number {
  const aVersion = parseMigrationVersion(a)
  const bVersion = parseMigrationVersion(b)

  if (aVersion && bVersion) {
    const versionOrder = compareVersionParts(aVersion, bVersion)
    if (versionOrder !== 0) {
      return versionOrder
    }
  }

  return explorerNameCollator.compare(a, b)
}

export function compareFileExplorerEntries<T extends { name: string; isDirectory: boolean }>(
  a: T,
  b: T
): number {
  if (a.isDirectory !== b.isDirectory) {
    return a.isDirectory ? -1 : 1
  }

  return compareFileExplorerNames(a.name, b.name)
}
