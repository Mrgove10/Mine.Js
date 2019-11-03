export var inventory = new Array;
export function addToInventory(blockString) {
    console.log("adding " + blockString + " to inventory");
    switch (blockString) {
        case "stone":
            inventory.push("stone");
            break;
        case "grass":

            break;
        case "dirt":

            break;
        case "leaf":

            break;
        case "wood":

            break;
 
        default:
            break;
    }
    console.log(inventory);
}