export default function () {
    var svg = this._getSvgSelection();
    this._brushSelection = svg.append("g").attr("class", "brush");

    var forceGroup = this._forceGroupSelection = svg.append('g').attr('class', 'force');
    
    forceGroup.append("g").attr("class", "paths");
    forceGroup.append("g").attr("class", "link-labels");
    forceGroup.append("g").attr("class", "nodes");
}