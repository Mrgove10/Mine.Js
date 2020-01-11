import { addToInventory } from '../player/inventory.js';

/**
 * possible craft the user has
 */
export var possibleCrafts = [];

/**
 * Allcraftable objects
 */
export var craftables = [
    {
        name: "woodenPickaxe",
        needs: {
            wood: 5
        },
        returns: 1,
        possible: false
    },
    {
        name: "stonePickaxe",
        needs: {
            stone: 3,
            wood: 2,
        },
        returns: 1,
        possible: false
    },
    {
        name: "ironPickaxe",
        needs: {
            iron: 3,
            wood: 2,
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
        console.log("crafts " + objToCraft);
        var objreturn = craftables.find(x => x.name === objToCraft);
        addToInventory(objreturn.name, objreturn.returns);
        return true;
    }
    return false;
}