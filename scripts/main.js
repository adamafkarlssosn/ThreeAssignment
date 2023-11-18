import UIManager from './managers/uiManager';
import Controls from './controls/controls';
import CadManager from './managers/cadManager';
import SceneManager from './managers/sceneManager';

// Main canvas Element
const canvasElement = document.getElementById('viewer');

//Scene manager, management of rendering and controlling the scene.
const sceneManager = new SceneManager(canvasElement);

//Input controls for clicking in the UI.
const controls = new Controls(false);

// Managing CAD
const cadManager = new CadManager(sceneManager);

// Controls basics initation (Basicly the main interaction)
controls.init( (event) => select(event), () => cadManager.resetSelection());

// Management of UI comps/buttons
const uiManager = new UIManager(cadManager, controls);

// Main function for creating selections in the scene.
function select(mouseEvent)
{
    const intersection = sceneManager.cast(mouseEvent);

    if(intersection)
    {
        const success = cadManager.tryCreatePoint(intersection);

        if(success)
        uiManager.showInfoWindow();
    }

}
