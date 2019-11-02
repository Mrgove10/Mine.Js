import { MAT_bedrock } from "../materials/bedrock.js";

/**
 * Generates a flat plane
 */
export function generateFlatTerrain(scene,renderDistance,mapsize) {
    var cubebedrock = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubebedrock.checkCollisions = true;
    cubebedrock.material = MAT_bedrock(scene);
    cubebedrock.addLODLevel(renderDistance, null);
    cubebedrock.freezeWorldMatrix();

    for (let i = 0; i < mapsize; i++) {
        for (let j = 0; j < mapsize; j++) {
            var cubebedrockinst = cubebedrock.createInstance(name);
            cubebedrockinst.position = new BABYLON.Vector3(i, -1, j);
            cubebedrockinst.backFaceCulling = true;
        }
    }
}