export var inventory = new Array;
var inventory = {
    stone: 0,
    grass: 0,
    dirt: 0,
    leaf: 0,
    wood: 0,
}
export function addToInventory(blockString) {
    //   console.log("adding " + blockString + " to inventory");
    switch (blockString) {
        case "stone":
            inventory.stone += 1;
            break;
        case "grass":
            inventory.grass += 1;
            break;
        case "dirt":
            inventory.dirt += 1;
            break;
        case "leaf":
            inventory.leaf += 1;
            break;
        case "wood":
            inventory.wood += 1
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