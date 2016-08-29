export default function () {
    var svg = d3.select(this._svg);
    svg.append("g").attr("class", "brush");

    var forceGroup = svg.append('g').attr('class', 'force');
    forceGroup.append("g").attr("class", "links");
    forceGroup.append("g").attr("class", "paths");
    forceGroup.append("g").attr("class", "link-labels");
    forceGroup.append("g").attr("class", "nodes");
}