export class Store<T> {
  constructor(
    public index: Set<number> = new Set<number>(),
    public archive: Map<number, T> = new Map<number, T>()
  ) {
  }

  has(key: number): boolean {
    return this.index.has(key);
  }

  put(key: number, val: T): Store<T> {
    console.log('Store put: ', key, val);
    this.archive[key] = val;
    this.index.add(key);
    return this;
  }

  get(key: number): T {
    if (this.has(key)) {
      return this.archive[key];
    }
    return null;
  }

  pop(key: number): T {
    let rval = null;
    if (this.has(key)) {
      rval = this.archive[key];
      this.index.delete(key);
      this.archive.delete(key);
    }
    return rval;
  }

  delete(key: number): boolean {
    return this.pop(key) !== null;

  }

  indexCopy() {
    return new Set<number>(this.index);
  }

  * indexIterator() {
    for (const idx of this.index) {
      yield idx;
    }
  }

}


