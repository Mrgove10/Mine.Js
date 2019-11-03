import { addToInventory } from '../player/inventory.js';

export function removeBlock(pickedBlock) {
    var id = pickedBlock.pickedMesh.id;
    pickedBlock.pickedMesh.dispose(); //Deletes the block 
    var blocktype = id.split(" ")[0]; //finds the blocktype based on its id
    addToInventory(blocktype);
}