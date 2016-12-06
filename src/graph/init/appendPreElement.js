export default function () {
    var svg = this.svgSelection();
    this._brushSelection = svg.append("g").attr("class", "brush");

    var forceGroup = this._forceGroupSelection = svg.append('g').attr('class', 'force');
    
    forceGroup.append("g").attr("class", "links");
    forceGroup.append("g").attr("class", "nodes");
}