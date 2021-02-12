/*
a.) Export your HashMap module
b.) Create a .js file called HashMaps_drills. In the file import the HashMap module. Create a function called main()
c.) Inside your main() function, create a hash map called lotr.
d.) For your hash map that you have created, set the MAX_LOAD_RATIO = 0.5 and SIZE_RATIO = 3.
e.) Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
{"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
{"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
{"Ent": "Treebeard"}
f.) Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
g.) Retrieve the value that is hashed in the key "Maiar" and Hobbit.
h.) What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.
i.) What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
*/

const HashMap = require('./HashMap.js');

function main(){
    
    let lotr = new HashMap();

    lotr.set('Hobbit', 'Bilbo');
    lotr.set('Hobbit', 'Frodo');
    lotr.set('Wizard', 'Gandalf');
    lotr.set('Human', 'Aragorn');
    lotr.set('Elf', 'Legolas');
    lotr.set('Maiar', 'The Necromancer');
    lotr.set('Maiar', 'Sauron');
    lotr.set('RingBearer', 'Gollum');
    lotr.set('LadyOfLight', 'Galadriel');
    lotr.set('HalfElven', 'Arwen');
    lotr.set('Ent', 'Treebeard');


    console.log(lotr.get('Maiar'));
    console.log(lotr.get('Hobbit'));

    return lotr;
}

console.log(main());

// Length: 9
// Capacity: 24
// Some items are overwritten due to having the same key, so not all items were displayed in output of hashmap
//[ , , arwen, , galadriel, , Gandalf, Gollum, , , , , Legolas, Frodo, , , , , , , Treebeard, , Aragorn, Sauron]

// The values of Maiar and Hobbit are: Sauron and Frodo respectively.


/*   PROBLEM 2: WhatDoesThisDo   */
// What is the output of the following code? 

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

WhatDoesThisDo();

// This function: 
// Sets string "Hello World" to str1
// Sets string "Hello World" to str2
// Creates a hashmap instance set to map1
// calls set function and sets str1 to value 10
// calls set function and sets str2 to value 20
// Creates new hashmap and set to map2
// Sets str3 to str1
// Sets str4 to str2
// calls set function and sets str3 to value 20
// calls set function and sets str4 to value 10
// Logs out value of str1 which is now 20
// Logs out value of str3 which is now 10


