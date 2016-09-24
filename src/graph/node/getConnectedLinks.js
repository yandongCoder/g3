export default function () {
    return this.graph._links.filter(function (Link) {
        return  ((Link.source === this) || (Link.target === this)) && !Link.merged();
    }, this);
}
