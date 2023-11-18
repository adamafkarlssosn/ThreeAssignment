import { AmbientLight, DirectionalLight, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, TextureLoader, Vector2, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class SceneManager
{
    constructor(canvasElement)
    {
        this.canvasElement = canvasElement;
        this.screenSize = new Vector2(this.canvasElement.offsetWidth ,this.canvasElement.offsetHeight);
        this.scene = new Scene();
        this.groundPlane = undefined;
        this.camera = new PerspectiveCamera(60, this.screenSize.x / this.screenSize.y, 0.1, 1000);
        this.camera.position.z = 5.0;
        this.camera.position.y = 5.0;
        this.camera.position.x = 5.0;
        this.raycaster = new Raycaster();
        this.renderer = new WebGLRenderer(
            {
                antialias:true,
                canvas:this.canvasElement
            }
        );
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(this.screenSize.x, this.screenSize.y);

        this.myVerySecretAccessToken = `pk.eyJ1IjoiYWRhbWFma2FybHNzb24iLCJhIjoiY2xsYXltbnR0MDJyNjNqbXF2ZHA0azc1OCJ9.TsOYW0WdDtlZditnoaDnbA`;
        this.MapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/12.4924,41.8902,9,0,0/800x600?access_token=${this.myVerySecretAccessToken}`    
        
        this.setupLight();
        this.initGroundPlane();
        this.setupAnimation()
    }

    addToScene(object)
    {
        this.scene.add( object );
    }

    getScene()
    {
        return this.scene;
    }

    getIntersectableObjects()
    {
        return this.groundPlane === undefined ? [undefined] : [this.groundPlane];
    }

    initGroundPlane()
    {
        const planeGeometry = new PlaneGeometry( 4,4,1,1 );

        const material = new MeshBasicMaterial(
        {
            map: new TextureLoader().load(this.MapboxUrl)
        })

        this.groundPlane = new Mesh( planeGeometry, material );
        this.groundPlane.rotateX((-Math.PI/2))
        this.addToScene(this.groundPlane);
    }

    setupAnimation() {
      
        this.orbitControls.update();
        this.renderer.render( this.scene, this.camera );

        requestAnimationFrame( () => {
            this.setupAnimation();
        })
    }

    setupLight()
    {
        const aLight = new AmbientLight();
        const dLight = new DirectionalLight();
        this.scene.add(aLight);
        this.scene.add(dLight);
    }

    cast(mouseEvent)
    {
        const mouse = new Vector2((mouseEvent.clientX /this.canvasElement.offsetWidth) * 2 - 1 ,
        -( mouseEvent.clientY /this.canvasElement.offsetHeight ) *2 + 1);

        this.raycaster.setFromCamera(mouse ,this.camera);
        const intersection = this.raycaster.intersectObjects(this.getIntersectableObjects())[0]
        
        return intersection;
    }  

}