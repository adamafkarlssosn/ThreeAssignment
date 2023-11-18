export default class Controls {
    constructor(enableMouseClick = false) {
        this.enableMouseClick = enableMouseClick;

        if (this.enableMouseClick) {
            this.setupMouseClickEvents();
        }
    }

    setupMouseClickEvents() {
        document.addEventListener('click', this.handleMouseClick);
        document.addEventListener('contextmenu', this.handleRightMouseClick);
    }

    handleMouseClick = (event) => {
        // Check if it's a left mouse click
        if (event.button === 0) {
            this.onMouseLeftClick(event);
        }
    };

    handleRightMouseClick = (event) => {
        event.preventDefault();
        this.onMouseRightClick(event);
    };

    onMouseLeftClick = (() => console.log('NotYetImpl'));
    onMouseRightClick = (() => console.log('NotYetImpl'));

    enableMouseClicks() 
    {
        if (!this.enableMouseClick) {
            this.enableMouseClick = true;
            this.setupMouseClickEvents();
        }
    }

    disableMouseClicks() {
        if (this.enableMouseClick) {
            this.enableMouseClick = false;
            document.removeEventListener('click', this.handleMouseClick);
            document.removeEventListener('contextmenu', this.handleRightMouseClick);
        }
    }

    init(onMouseLeftClick, onMouseRightClick) {
        this.onMouseLeftClick = onMouseLeftClick;
        this.onMouseRightClick = onMouseRightClick;
    }
}