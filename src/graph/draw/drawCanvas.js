export default function () {
    var context = this._canvas.getContext("2d");

    context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    context.strokeStyle = "#ccc";
    context.beginPath();
    this.getRenderedLinks().forEach(function(Link) {
        context.moveTo(Link.source.getX(), Link.source.getY());
        context.lineTo(Link.target.getX(), Link.target.getY());
    });
    context.stroke();

    context.beginPath();
    this.getRenderedNodes().forEach(function(Node) {
        context.fillStyle = Node.color();
        context.moveTo(Node.getX(), Node.getY());
        context.arc(Node.getX(), Node.getY(), Node.radius(), 0, 2 * Math.PI);
    });
    context.fill();
}