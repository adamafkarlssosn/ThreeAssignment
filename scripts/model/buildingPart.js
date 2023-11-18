import { BufferAttribute, BufferGeometry, DoubleSide, Matrix4, Mesh, MeshLambertMaterial, Object3D, PlaneGeometry, Vector3 } from "three";
import earcut from 'earcut'

export default class BuildingPart extends Object3D
{
    constructor(bufferArray, height, angle)
    {
        super();

        this.height = parseFloat(height);
        this.angleInRad = angle;

        this.shapeBuffer = [];
        bufferArray.map(point => this.shapeBuffer.push(new Vector3(point.x,point.y + this.height, point.z)));
        this.shapeBuffer = this.rotateBufferPoints(this.shapeBuffer,this.angleInRad);

        const polygon = this.createPolygon(this.shapeBuffer);
        this.add(polygon);

    }

    updateSides()
    {
        for (let i = 0; i < this.shapeBuffer.length - 1; i++) {
           const buffer = [];
            buffer.push(
                this.shapeBuffer[i],
                this.shapeBuffer[i + 1], 
                new Vector3(this.shapeBuffer[i + 1].x, 0.0, this.shapeBuffer[i + 1].z),
                new Vector3(this.shapeBuffer[i].x, 0, this.shapeBuffer[i].z),
                this.shapeBuffer[i]
                );
            const polygon = this.createPolygon(buffer);
            this.add(polygon);
        }
    }

    createPolygon(buffer)
    {
        const flatBuffer = buffer.flatMap(point => point.toArray());
            
        const triangles = earcut(flatBuffer,null,3); // The roof. Triangulated depending on the input shape.

        const vertices = new Float32Array(flatBuffer); // create buff
        const indices = new Uint16Array(triangles); // ind buff

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(vertices, 3));
        geometry.setIndex(new BufferAttribute(indices, 1));

        return new Mesh(geometry, new MeshLambertMaterial({color:0x00FF00, side:DoubleSide}));
    }

    rotateBufferPoints(shapeBuffer, angleInRad)
    {
        const rotationMatrix = new Matrix4(); 

        const rotationAxis = new Vector3(0, 0, 1); 

        rotationMatrix.makeRotationAxis(rotationAxis, parseFloat(angleInRad)); 

        const rotatedPoints = shapeBuffer.map(point => {
            const rotatedPoint = point.clone();
            rotatedPoint.applyMatrix4(rotationMatrix);
            return rotatedPoint;
        });

        return rotatedPoints;
    }
}