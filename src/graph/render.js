export default function () {
    //clearTimeout(this._renderDelay);
    //this._renderDelay = setTimeout(function(){
        this._init();
        this._draw();
    //}.bind(this),0);

        return this;

}