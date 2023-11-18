export default class UIManager {
    constructor(cadBuilder, controls ) {
        this.infoWindow = document.getElementById('infoWindow');
        this.drawingTools = document.getElementById('drawingTools');
        this.modelTools = document.getElementById('modelTools');
        this.completeShapeBtn = document.getElementById('completeShapeBtn');
        this.drawBtn = document.getElementById('drawBtn');
        this.extrudeHeight= document.getElementById('heightOffset');
        this.shapeAngle= document.getElementById('shapeAngle');
        
        this.drawBtn.addEventListener('click',  () => {
            controls.enableMouseClicks();
            this.hideDrawingTools();
            this.showModelTools();
        });

        // Assign click events
        this.completeShapeBtn.addEventListener('click',  () => {
            cadBuilder.completeShape(this.extrudeHeight.value, this.shapeAngle.value);
            this.hideInfoWindow();
            controls.disableMouseClicks();
        });
        }
    
    // Show button
    showInfoWindow() {
        this.infoWindow.style.display = 'block';
    }

    hideInfoWindow() {
        this.infoWindow.style.display = 'none';
    }

    showDrawingTools()
    {
        this.drawingTools.style.display = 'flex';
    }

    hideDrawingTools()
    {
        this.drawingTools.style.display = 'none';
    }

    showModelTools()
    {
        this.modelTools.style.display = 'flex';
    }

    hideModelTools()
    {
        this.modelTools.style.display = 'none';
    }

    
    showCompleteShapeBtn() {
        this.completeShapeBtn.style.display = 'block';
    }

    
    hideCompleteShapeBtn() {
        this.completeShapeBtn.style.display = 'none';
    }
}