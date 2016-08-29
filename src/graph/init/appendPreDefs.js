export default function () {
    let str = `<defs>
                        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%" type="Shadow" shadowoffsetx="5" shadowoffsety="5" shadowblur="5" shadowcolor="rgba(0,0,0)">
                            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="3"></feOffset>
                            <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
                        </filter>
                        <marker id="start-arrow" viewBox="0 -5 10 10" refX="-6" markerWidth="3" markerHeight="3" orient="auto"><path d="M10,-5L0,0L10,5"></path></marker>
                        <marker id="end-arrow" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>
                        <marker id="end-arrow-hover" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>
                        <marker id="end-arrow-selected" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>
                        <radialGradient id="linear" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:rgb(255，255,255);stop-opacity:0" />
                            <stop offset="90%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                            <stop offset="98%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                            <stop offset="100%" style="stop-color:rgb(222，222, 222);stop-opacity:1" />
                        </radialGradient>
                </defs>`;

    this._svg.insertAdjacentHTML("afterbegin", str);
}