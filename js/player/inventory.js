export var inventory = new Array;
export function addToInventory(blockString) {
    //   console.log("adding " + blockString + " to inventory");
    switch (blockString) {
        case "stone":
            inventory.push("stone");
            break;
        case "grass":
            inventory.push("grass");
            break;
        case "dirt":
            inventory.push("dirt");
            break;
        case "leaf":
            inventory.push("leaf");
            break;
        case "wood":
            inventory.push("wood");
            break;
        default:
            break;
    }
    // console.log(inventory);
}

export function showInventory() {
    console.log(inventory);
}