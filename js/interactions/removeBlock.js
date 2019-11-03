import { addToInventory } from '../player/inventory.js';

export function removeBlock(pickedBlock) {
    var id = pickedBlock.pickedMesh.id;
    var blocktype = id.split(" ")[0]; //finds the blocktype based on its id
    if (blocktype != "bedrock") {
        pickedBlock.pickedMesh.dispose(); //Deletes the block 
        addToInventory(blocktype);
    }
}