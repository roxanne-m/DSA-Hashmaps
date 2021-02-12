// Problem 1: Create a HashMap class

/*
Walk through the HashMap implementation in the curriculum 
and understand it well. Then write a HashMap class and its 
core functions with open addressing as the collision resolution mechanism.
*/

/**************************** HashMap function **********************/
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0; // length of table
    this._hashTable = []; // actual table
    this._capacity = initialCapacity; // capacity set to 8
    this._deleted = 0; // zero items deleted
  }

  /**************************** Hash Function: ***********************/
  // A hash function maps keys to positions in the hash table.
  // uses the ASCII value of the characters in the string, adds them together, and uses
  // other info to get a better distribution in the hash table.
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  /**************************** get function ******************************/
  // The get function gets an item using the key
  get(key) {
    // sets key index it finds from _findSlot() to index.
    const index = this._findSlot(key);
    //if specific index in hashtable is undefined, throw error
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    // else, return the value found from hashtable index.
    return this._hashTable[index].value;
  }

  /***************************** Set(): ****************************/
  // Best & Average case: O(1)
  // Worst case: O(n) (if collision takes place)
  // Adding items to hash map. Need to use set and _findSlot functions together
  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    // MAX_LOAD_RATIO keeps track of how full the hashmap is. When it is a certain % full, we move the a bigger hash table using the SIZE_RATIO
    // Checking if load ratio is greater than the given maximum. If so, resize hashmap using _resize function.
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    //   Find the slot where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false,
    };
  }

  /**************************** delete function *********************************/
  //  simplest solution is to not actually delete the item at all, and just put a
  // deleted marker in the slot. Then on resize you can actually clear out all of
  // the deleted items. This means that the hash map loads up slightly more quickly,
  // but simplifies the code significantly.
  delete(key) {
    // call findSlot function, pass key to find index, set to variable index
    const index = this._findSlot(key);
    // set hashTable index to slot
    const slot = this._hashTable[index];
    // if slot is undefined, throw error
    // trying to find the correct slot for the key
    if (slot === undefined) {
      throw new Error('Key error');
    }

    slot.DELETED = true; // set DELETED flag to true
    this.length--; // decrease the length
    this._deleted++; // increase the deleted count
  }

  /***********************_findSlot(): ******************************/
  // Best case: O(1) assuming the hash function is good and the load ratio is suitable, then the chances of collision (and needing to iterate) should be low.
  // Worst case: O(n) as you have to linearly search through each slot.
  // Uses the private _hashString() to calculate the hash of the key,
  // & then uses modulus to find a slot for the key within the current capacity.
  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    // Loops through array, stopping when it finds the slot with a matching key or an empty slot.
    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  /*****************************_resize() ******************************/
  // Resizing a hashmap involves recreating the hash map from scratch w/a larger capacity
  // Best & Average case: O(n), because you have to call set() 1 time for each item, and each set call is O(1) in the best and average case, and O(n) in the worst case.
  // Worst case: O(n^2)
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;

    // Reset the length - it will get rebuilt as you add the items back.
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;
