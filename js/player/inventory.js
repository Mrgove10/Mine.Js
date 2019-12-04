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
    woodenPickaxe: 0
}

export function addToInventory(objString, number) {
    //   console.log("adding " + blockString + " to inventory");
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
            inventory.stick += number;
            break;
        default:
            break;
    }
    // console.log(inventory);
}

export function getInventory() {
    return inventory;
}

export function showInventoryConsole() {
    console.log(inventory);
}