function keydowned() {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            //shift alt and space is used by d3 brush
            case 90:
                this.brush.show();
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