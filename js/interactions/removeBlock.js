import { addToInventory } from '../player/inventory.js';

/**
 * Remouves a block
 * @param {*} pickedBlock 
 * @param {*} handObject 
 */
export function removeBlock(pickedBlock, handObject) {
    var id = pickedBlock.pickedMesh.id;
    var blocktype = id.split(" ")[0]; //finds the blocktype based on its id
    if (blocktype != "bedrock") {
        switch (handObject) {
            case "hand":
                if (blocktype == "stone" || blocktype == "iron" || blocktype == "diamond") {
                    console.warn("you can't break this with your bare hands");
                }
                else {
                    pickedBlock.pickedMesh.dispose(); //Deletes the block 
                    addToInventory(blocktype, 1);
                }
                break;
            case "woodenPickaxe":
                if (blocktype == "iron" || blocktype == "diamond") {
                    console.warn("you can't break this with your wooden pickaxe");
                }
                else {
                    pickedBlock.pickedMesh.dispose(); //Deletes the block 
                    addToInventory(blocktype, 1);
                }
                break;
            case "stonePickaxe":
                if (blocktype == "diamond") {
                    console.warn("you can't break this with your stone pickaxe");
                }
                else {
                    pickedBlock.pickedMesh.dispose(); //Deletes the block 
                    addToInventory(blocktype, 1);
                }
                break;
            case "ironPickaxe":
                pickedBlock.pickedMesh.dispose(); //Deletes the block 
                addToInventory(blocktype, 1);
                break;
        }
    }
}
