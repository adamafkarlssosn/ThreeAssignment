import { BufferGeometry, LineBasicMaterial, LineLoop,Points, PointsMaterial, Vector3 } from "three";
import BuildingPart from "../model/buildingPart.js";

export default class CadManager
{

    constructor(sceneManager)
    {
        this.buildingPart = undefined;
        this.pointsArray = [];
        this.pointsBuffer = new BufferGeometry().setFromPoints([]);
        this.points = new Points(this.pointsBuffer, new PointsMaterial({ color: 0xff0000, size:0.3}));
        this.lineLoop = new LineLoop(this.pointsBuffer, new LineBasicMaterial({ color: 0xff0000}));
        this.scene = sceneManager.getScene();
        this.scene.add(this.points);
        this.scene.add(this.lineLoop)
    }

    updatePoints(newPoints) {
        this.pointsBuffer.setFromPoints(newPoints);
        this.pointsBuffer.attributes.position.needsUpdate = true; // Notify Three.js that the buffer data has changed
    }

    resetSelection()
    {
        this.pointsArray = [];
        this.updatePoints(this.pointsArray)
    }

    tryCreatePoint(intersection)
    {
        if(intersection === undefined)
        return false;

        const point = new Vector3(intersection.point.x, intersection.point.y,intersection.point.z);
        this.pointsArray.push(point);
        this.updatePoints(this.pointsArray)

        return true;
    }

    completeShape(heightOffset, angle)
    {
        const height = parseFloat(heightOffset);
        const angleInRad = (Math.PI / 180) * angle;
    
        if(height !== undefined && height > 0 && this.pointsArray.length >= 3)
        {
            const buffer = [...this.pointsArray, this.pointsArray[0]];
            this.buildingPart = new BuildingPart(buffer, height, angleInRad);
            this.buildingPart.updateSides();
            this.scene.add(this.buildingPart);
        }
        
       this.resetSelection();
    }    
}