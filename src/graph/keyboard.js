function keydowned() {
    d3.event.preventDefault();
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            //shift alt and space is used by d3 brush
            case 90:
                this.brush.show();
                break;
            case 46:
            case 8:
                this.removeNodes(this.getSelectedNodes());
            break;
            case 65:
                if(d3.event.ctrlKey) this.selectNodes(this.getNodes());
            break;
        }
    }
}

function keyupped() {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            case 90:
                this.brush.hide();
                break;
        }
    }
}

export {keydowned, keyupped};