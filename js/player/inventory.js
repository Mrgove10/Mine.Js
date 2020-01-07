/**
 * Inventry of the player
 */
export var inventory = {
    //blocks
    stone: 0,
    grass: 0,
    dirt: 0,
    leaf: 0,
    wood: 0,
    iron: 0,
    diamond: 0,

    //craftables
    stick: 0,
    woodenPickaxe: 0,
    stonePickaxe: 0,
    ironPickaxe: 0,
}

/**
 * Ands an objct to the inventory 
 * @param {} objString 
 * @param {*} number 
 */
export function addToInventory(objString, number) {
    switch (objString) {
        case "stone":
            inventory.stone += number;
            break;
        case "grass":
            inventory.grass += number;
            break;
        case "dirt":
            inventory.dirt += number;
            break;
        case "leaf":
            inventory.leaf += number;
            break;
        case "wood":
            inventory.wood += number;
            break;
        case "diamond":
            inventory.diamond += number;
            break;
        case "iron":
            inventory.iron += number;
            break;
        case "stick":
            //remouves necessairy things (could be improuved)
            inventory.wood -= 2;
            //Adds the objecy to the inventory
            inventory.stick += number;
            break;
        case "woodenPickaxe":
            //remouves necessairy things (could be improuved)
            inventory.stick -= 2;
            inventory.wood -= 3;
            //Adds the objecy to the inventory
            inventory.woodenPickaxe += number;

            break;
        case "stonePickaxe":
            
            //Adds the objecy to the inventory
            inventory.stonePickaxe += number;
            break;
        case "ironPickaxe":
            //Adds the objecy to the inventory
            inventory.ironPickaxe += number;
            break;
        default:
            break;
    }
}

/**
 * Returns the players inventory
 */
export function getInventory() {
    return inventory;
}

/**
 * SHows theinventory in the console fo easier dev
 */
export function showInventoryConsole() {
    console.log(inventory);
}