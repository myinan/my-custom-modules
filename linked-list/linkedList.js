import Node from "./node.js";

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    const newNode = new Node(value);
    this.head === null ? (this.head = newNode) : (this.tailNode.next = newNode);
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  get size() {
    if (!this.head) return new Error("List is empty.");
    let count = 0;
    let node = this.head;
    while (node) {
      count += 1;
      node = node.next;
    }
    return count;
  }

  get headNode() {
    if (!this.head) return new Error("List is empty.");
    return this.head;
  }

  get tailNode() {
    if (!this.head) return new Error("List is empty.");
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  getNodeAt(index) {
    if (this.head && index === 0) return this.head;
    if (!this.head) return new Error("List is empty.");
    let count = 0;
    let currentNode = this.head.next;
    while (currentNode) {
      count += 1;
      if (index === count) return currentNode;
      currentNode = currentNode.next;
    }
    return new Error(`Node at index ${index} does not exist.`);
  }

  pop() {
    if (!this.head) return new Error("The list is empty.");
    let cur = this.head;
    let tmp = cur;
    while (cur.next !== null) {
      tmp = cur;
      cur = cur.next;
    }
    tmp.next = null;
    if (tmp === cur) {
      tmp = null;
      this.head = null;
    }
    return tmp;
  }

  contains(value) {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) return true;
      cur = cur.next;
    }
    return false;
  }

  indexOf(value) {
    if (!this.head) return new Error("The list is empty.");
    let cur = this.head;
    let curIndex = 0;
    while (cur) {
      if (cur.value === value) return curIndex;
      cur = cur.next;
      curIndex += 1;
    }
    return new Error("There are no nodes in the list with the searched value.");
  }

  toString() {
    if (!this.head) return new Error("The list is empty.");
    let cur = this.head;
    let string = "";
    while (cur) {
      const stringToConcat = `( ${cur.value} ) => `;
      string = string.concat(stringToConcat);
      cur = cur.next;
    }
    return string.concat("null");
  }

  insertAt(value, index) {
    const newNode = new Node(value);
    let cur = this.head;
    let tmp = cur;
    let track = 0;
    let indexInRange = false;
    while (cur) {
      if (track === index) {
        tmp.next = newNode;
        newNode.next = cur;
        indexInRange = true;
      }
      tmp = cur;
      cur = cur.next;
      track += 1;
    }
    if (!indexInRange)
      return new Error("Index is outside of the linked list boundries.");
    return newNode;
  }

  removeAt(index) {
    if (!this.head) return new Error("The list is empty.");

    if (index === 0) {
      const removedHead = this.head;
      this.head = this.head.next;
      removedHead.next = null;
      return removedHead;
    }

    let cur = this.head;
    let tmp = null;
    let track = 0;
    let indexInRange = false;
    let removedElement;

    while (cur) {
      if (track === index) {
        tmp.next = cur.next;
        cur.next = null;
        removedElement = cur;
        indexInRange = true;
        break; // exit the loop after removal
      }

      tmp = cur;
      cur = cur.next;
      track += 1;
    }

    if (!indexInRange)
      return new Error("Index is outside of the linked list boundaries.");

    return removedElement;
  }

  clear() {
    if (!this.head) return new Error("The list is empty.");
    this.head = null;
    return this.head;
  }
}
