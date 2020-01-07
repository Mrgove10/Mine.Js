import { addToInventory } from '../player/inventory.js';

export var possibleCrafts = [];
export var craftables = [
    {
        name: "stick",
        needs: {
            wood: 2,
        },
        returns: 2,
        possible: false
    },
    {
        name: "woodenPickaxe",
        needs: {
            wood: 3,
            stick: 2,
        },
        returns: 1,
        possible: false
    },
    {
        name: "stonePickaxe",
        needs: {
            stone: 3,
            stick: 2,
        },
        returns: 1,
        possible: false
    },
    {
        name: "ironPickaxe",
        needs: {
            iron: 3,
            stick: 2,
        },
        returns: 1,
        possible: false
    }
]

//https://www.babylonjs-playground.com/#XCPP9Y#888

/**
 * Gets all the craftable objects
 * @param {} inventory 
 */
export function getCraftables(inventory) {
    possibleCrafts = []; //resets the posssible crafts
    craftables.forEach(element => {
        var craftFactor = 0
        if (inventory.wood >= element.needs.wood) {
            craftFactor++;
        }
        if (inventory.stick >= element.needs.stick) {
            craftFactor++;
        }
        if (inventory.stone >= element.needs.stone) {
            craftFactor++;
        }
        if (inventory.iron >= element.needs.iron) {
            craftFactor++;
        }
        if (craftFactor == Object.keys(element.needs).length) {
            element.possible = true;
            possibleCrafts.push(element.name);
        }
        else {
            element.possible = false;
        }
    });
    return possibleCrafts;
}


/**
 * Crafts
 * @param {*} inventory 
 * @param {*} objToCraft 
 */
export function craft(inventory, objToCraft) {
    console.log("wants to craft " + objToCraft);
    var verification = getCraftables(inventory);
    if (verification.includes(objToCraft)) {
        console.log("can craft " + objToCraft);
        var objreturn = craftables.find(x => x.name === objToCraft);
        addToInventory(objreturn.name, objreturn.returns);
    }
}