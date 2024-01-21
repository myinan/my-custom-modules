import LinkedList from "@myinan/linked-list/linkedList";

export default class HashSet {
  #currentSize = 0;

  constructor(initialLength = 16) {
    this.table = new Array(initialLength);
    this.tableLength = initialLength;
  }

  static #hash(string) {
    let hashCode = 0;

    const primeNumber = 51;
    for (let i = 0; i < string.length; i += 1) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  }

  #resize(newCapacity) {
    const oldData = this.table;
    this.tableLength = newCapacity;
    this.#currentSize = 0;
    this.table = new Array(newCapacity);

    oldData.forEach((bucket) => {
      if (bucket) {
        let cur = bucket.head;
        while (cur) {
          this.set(cur.value);
          cur = cur.next;
        }
      }
    });
  }

  set(key) {
    const index = HashSet.#hash(key) % this.tableLength;
    if (this.table[index]) {
      this.table[index].append(key);
      this.#currentSize += 1;
    } else if (!this.table[index]) {
      this.table[index] = new LinkedList();
      this.table[index].append(key);
      this.#currentSize += 1;
    }

    // Resize if table got too crowded
    const loadFactor = this.#currentSize / this.tableLength;
    if (loadFactor > 0.75) {
      this.#resize(this.tableLength * 2);
    }
  }

  has(key) {
    const index = HashSet.#hash(key) % this.tableLength;
    let cur = this.table[index]?.head;
    while (cur) {
      if (cur.value === key) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  remove(key) {
    const index = HashSet.#hash(key) % this.tableLength;
    const bucket = this.table[index];
    let cur = bucket?.head;

    while (cur) {
      if (cur.value === key) {
        const curIndex = bucket.indexOf(cur.value);
        bucket.removeAt(curIndex);
        this.#currentSize -= 1;
        return true;
      }
      cur = cur.next;
    }

    return false;
  }

  get length() {
    let length = 0;
    this.table.forEach((bucket) => {
      if (bucket) {
        let cur = bucket.head;
        while (cur) {
          length += 1;
          cur = cur.next;
        }
      }
    });
    return length;
  }

  clear() {
    this.table = [];
  }

  get keys() {
    const keys = [];
    this.table.forEach((bucket) => {
      if (bucket) {
        let cur = bucket.head;
        while (cur) {
          keys.push(cur.value);
          cur = cur.next;
        }
      }
    });
    return keys;
  }
}
