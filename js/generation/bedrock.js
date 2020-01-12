import { MAT_bedrock } from "../materials/bedrock.js";

/**
 * Generates a flat plane
 */
export function generateFlatTerrain(scene, renderDistance, mapsize) {
    var cubebedrock = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubebedrock.checkCollisions = true;
    cubebedrock.material = MAT_bedrock(scene);
    cubebedrock.addLODLevel(renderDistance, null);
    cubebedrock.freezeWorldMatrix();

    var height = 0;
    for (let x = 0; x < mapsize; x++) {
        for (let y = 0; y < mapsize; y++) {
            var name = "bedrock #" + x + "-" + height + "-" + y;
            var cubebedrockinst = cubebedrock.createInstance(name);
            cubebedrockinst.position = new BABYLON.Vector3(x, height, y);
            cubebedrockinst.checkCollisions = true;
            cubebedrockinst.backFaceCulling = true;
        }
    }
}