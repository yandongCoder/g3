export default function () {
    if(!this.transformed() && this.source.transformed()) this.source.NtoL();
    if(!this.transformed() && this.target.transformed()) this.target.NtoL();
}