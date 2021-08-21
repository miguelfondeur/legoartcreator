export default class MosaicCanvas extends HTMLElement {
    
    render() {
        this.shadow.innerHTML = /*html*/`
        <style>
            .scroll-container {
                width: 100%;
                overflow: auto;
            }
            #canvas-container {
                background-color: var(--canvas-bg);
                position: relative;
                width: 480px;
                height: 480px;
                margin: 0 auto;
                border: 10px solid black;
                box-sizing: content-box;
                transition: .2s linear width;
                overflow: hidden;
            }
            .canvas-grid {
                position: absolute;
                width: 480px;
                left:0;
                top:0;
            }
            #canvas-container.ultra {
                width: 1440px;
            }
            .canvas-grid:nth-child(2) {
                left: 480px
            }
            #canvas-container.wide {
                width: 960px;
            }
            .canvas-grid:nth-child(3) {
                left: 960px
            }
            #artBoard {
                background-color: transparent;
                margin: 0 auto;
                display: block;
                width: 100%;
            }
            #artBoard.converted {
                background-color: #333;
            }
            .artBoard {
                position: absolute;
                width: 100%;
                top: 0px;
                left: 0px;
                height: 480px;
            }
        </style>

            <div class="scroll-container">
                <div id="canvas-container" class="${this.size}">
                    <div class="svg-grid">
                        <svg class="canvas-grid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <mask id="b">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <symbol id="a">
                                    <circle cx="1.04" cy="1.04" r="1.04"/> 
                                    <circle cx="3.12" cy="1.04" r="1.04"/> 
                                    <circle cx="5.20" cy="1.04" r="1.04"/> 
                                    <circle cx="7.28" cy="1.04" r="1.04"/> 
                                    <circle cx="9.36" cy="1.04" r="1.04"/> 
                                    <circle cx="11.44" cy="1.04" r="1.04"/>
                                    <circle cx="13.52" cy="1.04" r="1.04"/>
                                    <circle cx="15.6" cy="1.04" r="1.04"/>
                                    <circle cx="17.68" cy="1.04" r="1.04"/>
                                    <circle cx="19.76" cy="1.04" r="1.04"/>
                                    <circle cx="21.84" cy="1.04" r="1.04"/>
                                    <circle cx="23.92" cy="1.04" r="1.04"/>
                                    <circle cx="26" cy="1.04" r="1.04"/>
                                    <circle cx="28.08" cy="1.04" r="1.04"/>
                                    <circle cx="30.16" cy="1.04" r="1.04"/>
                                    <circle cx="32.24" cy="1.04" r="1.04"/>
                                    <g>
                                        <circle cx="1.04" cy="3.12" r="1.04"/> 
                                        <circle cx="3.12" cy="3.12" r="1.04"/> 
                                        <circle cx="5.20" cy="3.12" r="1.04"/> 
                                        <circle cx="7.28" cy="3.12" r="1.04"/> 
                                        <circle cx="9.36" cy="3.12" r="1.04"/> 
                                        <circle cx="11.44" cy="3.12" r="1.04"/> 
                                        <circle cx="13.52" cy="3.12" r="1.04"/> 
                                        <circle cx="15.6" cy="3.12" r="1.04"/> 
                                        <circle cx="17.68" cy="3.12" r="1.04"/> 
                                        <circle cx="19.76" cy="3.12" r="1.04"/> 
                                        <circle cx="21.84" cy="3.12" r="1.04"/>
                                        <circle cx="23.92" cy="3.12" r="1.04"/>
                                        <circle cx="26" cy="3.12" r="1.04"/>
                                        <circle cx="28.08" cy="3.12" r="1.04"/>
                                        <circle cx="30.16" cy="3.12" r="1.04"/>
                                        <circle cx="32.24" cy="3.12" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="5.20" r="1.04"/> 
                                        <circle cx="3.12" cy="5.20" r="1.04"/> 
                                        <circle cx="5.20" cy="5.20" r="1.04"/> 
                                        <circle cx="7.28" cy="5.20" r="1.04"/> 
                                        <circle cx="9.36" cy="5.20" r="1.04"/> 
                                        <circle cx="11.44" cy="5.20" r="1.04"/> 
                                        <circle cx="13.52" cy="5.20" r="1.04"/> 
                                        <circle cx="15.6" cy="5.20" r="1.04"/> 
                                        <circle cx="17.68" cy="5.20" r="1.04"/> 
                                        <circle cx="19.76" cy="5.20" r="1.04"/> 
                                        <circle cx="21.84" cy="5.20" r="1.04"/>
                                        <circle cx="23.92" cy="5.20" r="1.04"/>
                                        <circle cx="26" cy="5.20" r="1.04"/>
                                        <circle cx="28.08" cy="5.20" r="1.04"/>
                                        <circle cx="30.16" cy="5.20" r="1.04"/>
                                        <circle cx="32.24" cy="5.20" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="7.28" r="1.04"/> 
                                        <circle cx="3.12" cy="7.28" r="1.04"/> 
                                        <circle cx="5.20" cy="7.28" r="1.04"/> 
                                        <circle cx="7.28" cy="7.28" r="1.04"/> 
                                        <circle cx="9.36" cy="7.28" r="1.04"/> 
                                        <circle cx="11.44" cy="7.28" r="1.04"/> 
                                        <circle cx="13.52" cy="7.28" r="1.04"/> 
                                        <circle cx="15.6" cy="7.28" r="1.04"/> 
                                        <circle cx="17.68" cy="7.28" r="1.04"/> 
                                        <circle cx="19.76" cy="7.28" r="1.04"/> 
                                        <circle cx="21.84" cy="7.28" r="1.04"/>
                                        <circle cx="23.92" cy="7.28" r="1.04"/>
                                        <circle cx="26" cy="7.28" r="1.04"/>
                                        <circle cx="28.08" cy="7.28" r="1.04"/>
                                        <circle cx="30.16" cy="7.28" r="1.04"/>
                                        <circle cx="32.24" cy="7.28" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="9.36" r="1.04"/> 
                                        <circle cx="3.12" cy="9.36" r="1.04"/> 
                                        <circle cx="5.20" cy="9.36" r="1.04"/> 
                                        <circle cx="7.28" cy="9.36" r="1.04"/> 
                                        <circle cx="9.36" cy="9.36" r="1.04"/> 
                                        <circle cx="11.44" cy="9.36" r="1.04"/> 
                                        <circle cx="13.52" cy="9.36" r="1.04"/> 
                                        <circle cx="15.6" cy="9.36" r="1.04"/> 
                                        <circle cx="17.68" cy="9.36" r="1.04"/> 
                                        <circle cx="19.76" cy="9.36" r="1.04"/> 
                                        <circle cx="21.84" cy="9.36" r="1.04"/>
                                        <circle cx="23.92" cy="9.36" r="1.04"/>
                                        <circle cx="26" cy="9.36" r="1.04"/>
                                        <circle cx="28.08" cy="9.36" r="1.04"/>
                                        <circle cx="30.16" cy="9.36" r="1.04"/>
                                        <circle cx="32.24" cy="9.36" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="11.44" r="1.04"/> 
                                        <circle cx="3.12" cy="11.44" r="1.04"/> 
                                        <circle cx="5.20" cy="11.44" r="1.04"/> 
                                        <circle cx="7.28" cy="11.44" r="1.04"/> 
                                        <circle cx="9.36" cy="11.44" r="1.04"/> 
                                        <circle cx="11.44" cy="11.44" r="1.04"/> 
                                        <circle cx="13.52" cy="11.44" r="1.04"/> 
                                        <circle cx="15.6" cy="11.44" r="1.04"/> 
                                        <circle cx="17.68" cy="11.44" r="1.04"/> 
                                        <circle cx="19.76" cy="11.44" r="1.04"/> 
                                        <circle cx="21.84" cy="11.44" r="1.04"/>
                                        <circle cx="23.92" cy="11.44" r="1.04"/>
                                        <circle cx="26" cy="11.44" r="1.04"/>
                                        <circle cx="28.08" cy="11.44" r="1.04"/>
                                        <circle cx="30.16" cy="11.44" r="1.04"/>
                                        <circle cx="32.24" cy="11.44" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="17.68" r="1.04"/> 
                                        <circle cx="3.12" cy="17.68" r="1.04"/> 
                                        <circle cx="5.20" cy="17.68" r="1.04"/> 
                                        <circle cx="7.28" cy="17.68" r="1.04"/> 
                                        <circle cx="9.36" cy="17.68" r="1.04"/> 
                                        <circle cx="11.44" cy="17.68" r="1.04"/> 
                                        <circle cx="13.52" cy="17.68" r="1.04"/> 
                                        <circle cx="15.6" cy="17.68" r="1.04"/> 
                                        <circle cx="17.68" cy="17.68" r="1.04"/> 
                                        <circle cx="19.76" cy="17.68" r="1.04"/> 
                                        <circle cx="21.84" cy="17.68" r="1.04"/>
                                        <circle cx="23.92" cy="17.68" r="1.04"/>
                                        <circle cx="26" cy="17.68" r="1.04"/>
                                        <circle cx="28.08" cy="17.68" r="1.04"/>
                                        <circle cx="30.16" cy="17.68" r="1.04"/>
                                        <circle cx="32.24" cy="17.68" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="19.76" r="1.04"/> 
                                        <circle cx="3.12" cy="19.76" r="1.04"/> 
                                        <circle cx="5.20" cy="19.76" r="1.04"/> 
                                        <circle cx="7.28" cy="19.76" r="1.04"/> 
                                        <circle cx="9.36" cy="19.76" r="1.04"/> 
                                        <circle cx="11.44" cy="19.76" r="1.04"/> 
                                        <circle cx="13.52" cy="19.76" r="1.04"/> 
                                        <circle cx="15.6" cy="19.76" r="1.04"/> 
                                        <circle cx="17.68" cy="19.76" r="1.04"/> 
                                        <circle cx="19.76" cy="19.76" r="1.04"/> 
                                        <circle cx="21.84" cy="19.76" r="1.04"/>
                                        <circle cx="23.92" cy="19.76" r="1.04"/>
                                        <circle cx="26" cy="19.76" r="1.04"/>
                                        <circle cx="28.08" cy="19.76" r="1.04"/>
                                        <circle cx="30.16" cy="19.76" r="1.04"/>
                                        <circle cx="32.24" cy="19.76" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="21.84" r="1.04"/> 
                                        <circle cx="3.12" cy="21.84" r="1.04"/> 
                                        <circle cx="5.20" cy="21.84" r="1.04"/> 
                                        <circle cx="7.28" cy="21.84" r="1.04"/> 
                                        <circle cx="9.36" cy="21.84" r="1.04"/> 
                                        <circle cx="11.44" cy="21.84" r="1.04"/> 
                                        <circle cx="13.52" cy="21.84" r="1.04"/> 
                                        <circle cx="15.6" cy="21.84" r="1.04"/> 
                                        <circle cx="17.68" cy="21.84" r="1.04"/> 
                                        <circle cx="19.76" cy="21.84" r="1.04"/> 
                                        <circle cx="21.84" cy="21.84" r="1.04"/>
                                        <circle cx="23.92" cy="21.84" r="1.04"/>
                                        <circle cx="26" cy="21.84" r="1.04"/>
                                        <circle cx="28.08" cy="21.84" r="1.04"/>
                                        <circle cx="30.16" cy="21.84" r="1.04"/>
                                        <circle cx="32.24" cy="21.84" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="23.92" r="1.04"/> 
                                        <circle cx="3.12" cy="23.92" r="1.04"/> 
                                        <circle cx="5.20" cy="23.92" r="1.04"/> 
                                        <circle cx="7.28" cy="23.92" r="1.04"/> 
                                        <circle cx="9.36" cy="23.92" r="1.04"/> 
                                        <circle cx="11.44" cy="23.92" r="1.04"/> 
                                        <circle cx="13.52" cy="23.92" r="1.04"/> 
                                        <circle cx="15.6" cy="23.92" r="1.04"/> 
                                        <circle cx="17.68" cy="23.92" r="1.04"/> 
                                        <circle cx="19.76" cy="23.92" r="1.04"/> 
                                        <circle cx="21.84" cy="23.92" r="1.04"/>
                                        <circle cx="23.92" cy="23.92" r="1.04"/>
                                        <circle cx="26" cy="23.92" r="1.04"/>
                                        <circle cx="28.08" cy="23.92" r="1.04"/>
                                        <circle cx="30.16" cy="23.92" r="1.04"/>
                                        <circle cx="32.24" cy="23.92" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="26" r="1.04"/> 
                                        <circle cx="3.12" cy="26" r="1.04"/> 
                                        <circle cx="5.20" cy="26" r="1.04"/> 
                                        <circle cx="7.28" cy="26" r="1.04"/> 
                                        <circle cx="9.36" cy="26" r="1.04"/> 
                                        <circle cx="11.44" cy="26" r="1.04"/> 
                                        <circle cx="13.52" cy="26" r="1.04"/> 
                                        <circle cx="15.6" cy="26" r="1.04"/> 
                                        <circle cx="17.68" cy="26" r="1.04"/> 
                                        <circle cx="19.76" cy="26" r="1.04"/> 
                                        <circle cx="21.84" cy="26" r="1.04"/>
                                        <circle cx="23.92" cy="26" r="1.04"/>
                                        <circle cx="26" cy="26" r="1.04"/>
                                        <circle cx="28.08" cy="26" r="1.04"/>
                                        <circle cx="30.16" cy="26" r="1.04"/>
                                        <circle cx="32.24" cy="26" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="28.08" r="1.04"/> 
                                        <circle cx="3.12" cy="28.08" r="1.04"/> 
                                        <circle cx="5.20" cy="28.08" r="1.04"/> 
                                        <circle cx="7.28" cy="28.08" r="1.04"/> 
                                        <circle cx="9.36" cy="28.08" r="1.04"/> 
                                        <circle cx="11.44" cy="28.08" r="1.04"/> 
                                        <circle cx="13.52" cy="28.08" r="1.04"/> 
                                        <circle cx="15.6" cy="28.08" r="1.04"/> 
                                        <circle cx="17.68" cy="28.08" r="1.04"/> 
                                        <circle cx="19.76" cy="28.08" r="1.04"/> 
                                        <circle cx="21.84" cy="28.08" r="1.04"/>
                                        <circle cx="23.92" cy="28.08" r="1.04"/>
                                        <circle cx="26" cy="28.08" r="1.04"/>
                                        <circle cx="28.08" cy="28.08" r="1.04"/>
                                        <circle cx="30.16" cy="28.08" r="1.04"/>
                                        <circle cx="32.24" cy="28.08" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="30.16" r="1.04"/> 
                                        <circle cx="3.12" cy="30.16" r="1.04"/> 
                                        <circle cx="5.20" cy="30.16" r="1.04"/> 
                                        <circle cx="7.28" cy="30.16" r="1.04"/> 
                                        <circle cx="9.36" cy="30.16" r="1.04"/> 
                                        <circle cx="11.44" cy="30.16" r="1.04"/> 
                                        <circle cx="13.52" cy="30.16" r="1.04"/> 
                                        <circle cx="15.6" cy="30.16" r="1.04"/> 
                                        <circle cx="17.68" cy="30.16" r="1.04"/> 
                                        <circle cx="19.76" cy="30.16" r="1.04"/> 
                                        <circle cx="21.84" cy="30.16" r="1.04"/>
                                        <circle cx="23.92" cy="30.16" r="1.04"/>
                                        <circle cx="26" cy="30.16" r="1.04"/>
                                        <circle cx="28.08" cy="30.16" r="1.04"/>
                                        <circle cx="30.16" cy="30.16" r="1.04"/>
                                        <circle cx="32.24" cy="30.16" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="32.24" r="1.04"/> 
                                        <circle cx="3.12" cy="32.24" r="1.04"/> 
                                        <circle cx="5.20" cy="32.24" r="1.04"/> 
                                        <circle cx="7.28" cy="32.24" r="1.04"/> 
                                        <circle cx="9.36" cy="32.24" r="1.04"/> 
                                        <circle cx="11.44" cy="32.24" r="1.04"/> 
                                        <circle cx="13.52" cy="32.24" r="1.04"/> 
                                        <circle cx="15.6" cy="32.24" r="1.04"/> 
                                        <circle cx="17.68" cy="32.24" r="1.04"/> 
                                        <circle cx="19.76" cy="32.24" r="1.04"/> 
                                        <circle cx="21.84" cy="32.24" r="1.04"/>
                                        <circle cx="23.92" cy="32.24" r="1.04"/>
                                        <circle cx="26" cy="32.24" r="1.04"/>
                                        <circle cx="28.08" cy="32.24" r="1.04"/>
                                        <circle cx="30.16" cy="32.24" r="1.04"/>
                                        <circle cx="32.24" cy="32.24" r="1.04"/> 
                                    </g>
                                </symbol>
                                <use href="#a"/>
                                <use x="33.33" href="#a"/>
                                <use x="66.66" href="#a"/>
                                <use y="33.33" href="#a"/>
                                <use x="33.33" y="33.33" href="#a"/>
                                <use x="66.66" y="33.33" href="#a"/>
                                <use y="66.66" href="#a"/>
                                <use x="33.33" y="66.66" href="#a"/>
                                <use x="66.66" y="66.66" href="#a"/>
                            </mask>
                            <path d="M0 0h100v100H0z" mask="url(#b)" fill="var(--canvas-svg)"/>
                        </svg>
                        <svg class="canvas-grid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <mask id="b">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <symbol id="a">
                                    <circle cx="1.04" cy="1.04" r="1.04"/> 
                                    <circle cx="3.12" cy="1.04" r="1.04"/> 
                                    <circle cx="5.20" cy="1.04" r="1.04"/> 
                                    <circle cx="7.28" cy="1.04" r="1.04"/> 
                                    <circle cx="9.36" cy="1.04" r="1.04"/> 
                                    <circle cx="11.44" cy="1.04" r="1.04"/>
                                    <circle cx="13.52" cy="1.04" r="1.04"/>
                                    <circle cx="15.6" cy="1.04" r="1.04"/>
                                    <circle cx="17.68" cy="1.04" r="1.04"/>
                                    <circle cx="19.76" cy="1.04" r="1.04"/>
                                    <circle cx="21.84" cy="1.04" r="1.04"/>
                                    <circle cx="23.92" cy="1.04" r="1.04"/>
                                    <circle cx="26" cy="1.04" r="1.04"/>
                                    <circle cx="28.08" cy="1.04" r="1.04"/>
                                    <circle cx="30.16" cy="1.04" r="1.04"/>
                                    <circle cx="32.24" cy="1.04" r="1.04"/>
                                    <g>
                                        <circle cx="1.04" cy="3.12" r="1.04"/> 
                                        <circle cx="3.12" cy="3.12" r="1.04"/> 
                                        <circle cx="5.20" cy="3.12" r="1.04"/> 
                                        <circle cx="7.28" cy="3.12" r="1.04"/> 
                                        <circle cx="9.36" cy="3.12" r="1.04"/> 
                                        <circle cx="11.44" cy="3.12" r="1.04"/> 
                                        <circle cx="13.52" cy="3.12" r="1.04"/> 
                                        <circle cx="15.6" cy="3.12" r="1.04"/> 
                                        <circle cx="17.68" cy="3.12" r="1.04"/> 
                                        <circle cx="19.76" cy="3.12" r="1.04"/> 
                                        <circle cx="21.84" cy="3.12" r="1.04"/>
                                        <circle cx="23.92" cy="3.12" r="1.04"/>
                                        <circle cx="26" cy="3.12" r="1.04"/>
                                        <circle cx="28.08" cy="3.12" r="1.04"/>
                                        <circle cx="30.16" cy="3.12" r="1.04"/>
                                        <circle cx="32.24" cy="3.12" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="5.20" r="1.04"/> 
                                        <circle cx="3.12" cy="5.20" r="1.04"/> 
                                        <circle cx="5.20" cy="5.20" r="1.04"/> 
                                        <circle cx="7.28" cy="5.20" r="1.04"/> 
                                        <circle cx="9.36" cy="5.20" r="1.04"/> 
                                        <circle cx="11.44" cy="5.20" r="1.04"/> 
                                        <circle cx="13.52" cy="5.20" r="1.04"/> 
                                        <circle cx="15.6" cy="5.20" r="1.04"/> 
                                        <circle cx="17.68" cy="5.20" r="1.04"/> 
                                        <circle cx="19.76" cy="5.20" r="1.04"/> 
                                        <circle cx="21.84" cy="5.20" r="1.04"/>
                                        <circle cx="23.92" cy="5.20" r="1.04"/>
                                        <circle cx="26" cy="5.20" r="1.04"/>
                                        <circle cx="28.08" cy="5.20" r="1.04"/>
                                        <circle cx="30.16" cy="5.20" r="1.04"/>
                                        <circle cx="32.24" cy="5.20" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="7.28" r="1.04"/> 
                                        <circle cx="3.12" cy="7.28" r="1.04"/> 
                                        <circle cx="5.20" cy="7.28" r="1.04"/> 
                                        <circle cx="7.28" cy="7.28" r="1.04"/> 
                                        <circle cx="9.36" cy="7.28" r="1.04"/> 
                                        <circle cx="11.44" cy="7.28" r="1.04"/> 
                                        <circle cx="13.52" cy="7.28" r="1.04"/> 
                                        <circle cx="15.6" cy="7.28" r="1.04"/> 
                                        <circle cx="17.68" cy="7.28" r="1.04"/> 
                                        <circle cx="19.76" cy="7.28" r="1.04"/> 
                                        <circle cx="21.84" cy="7.28" r="1.04"/>
                                        <circle cx="23.92" cy="7.28" r="1.04"/>
                                        <circle cx="26" cy="7.28" r="1.04"/>
                                        <circle cx="28.08" cy="7.28" r="1.04"/>
                                        <circle cx="30.16" cy="7.28" r="1.04"/>
                                        <circle cx="32.24" cy="7.28" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="9.36" r="1.04"/> 
                                        <circle cx="3.12" cy="9.36" r="1.04"/> 
                                        <circle cx="5.20" cy="9.36" r="1.04"/> 
                                        <circle cx="7.28" cy="9.36" r="1.04"/> 
                                        <circle cx="9.36" cy="9.36" r="1.04"/> 
                                        <circle cx="11.44" cy="9.36" r="1.04"/> 
                                        <circle cx="13.52" cy="9.36" r="1.04"/> 
                                        <circle cx="15.6" cy="9.36" r="1.04"/> 
                                        <circle cx="17.68" cy="9.36" r="1.04"/> 
                                        <circle cx="19.76" cy="9.36" r="1.04"/> 
                                        <circle cx="21.84" cy="9.36" r="1.04"/>
                                        <circle cx="23.92" cy="9.36" r="1.04"/>
                                        <circle cx="26" cy="9.36" r="1.04"/>
                                        <circle cx="28.08" cy="9.36" r="1.04"/>
                                        <circle cx="30.16" cy="9.36" r="1.04"/>
                                        <circle cx="32.24" cy="9.36" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="11.44" r="1.04"/> 
                                        <circle cx="3.12" cy="11.44" r="1.04"/> 
                                        <circle cx="5.20" cy="11.44" r="1.04"/> 
                                        <circle cx="7.28" cy="11.44" r="1.04"/> 
                                        <circle cx="9.36" cy="11.44" r="1.04"/> 
                                        <circle cx="11.44" cy="11.44" r="1.04"/> 
                                        <circle cx="13.52" cy="11.44" r="1.04"/> 
                                        <circle cx="15.6" cy="11.44" r="1.04"/> 
                                        <circle cx="17.68" cy="11.44" r="1.04"/> 
                                        <circle cx="19.76" cy="11.44" r="1.04"/> 
                                        <circle cx="21.84" cy="11.44" r="1.04"/>
                                        <circle cx="23.92" cy="11.44" r="1.04"/>
                                        <circle cx="26" cy="11.44" r="1.04"/>
                                        <circle cx="28.08" cy="11.44" r="1.04"/>
                                        <circle cx="30.16" cy="11.44" r="1.04"/>
                                        <circle cx="32.24" cy="11.44" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="17.68" r="1.04"/> 
                                        <circle cx="3.12" cy="17.68" r="1.04"/> 
                                        <circle cx="5.20" cy="17.68" r="1.04"/> 
                                        <circle cx="7.28" cy="17.68" r="1.04"/> 
                                        <circle cx="9.36" cy="17.68" r="1.04"/> 
                                        <circle cx="11.44" cy="17.68" r="1.04"/> 
                                        <circle cx="13.52" cy="17.68" r="1.04"/> 
                                        <circle cx="15.6" cy="17.68" r="1.04"/> 
                                        <circle cx="17.68" cy="17.68" r="1.04"/> 
                                        <circle cx="19.76" cy="17.68" r="1.04"/> 
                                        <circle cx="21.84" cy="17.68" r="1.04"/>
                                        <circle cx="23.92" cy="17.68" r="1.04"/>
                                        <circle cx="26" cy="17.68" r="1.04"/>
                                        <circle cx="28.08" cy="17.68" r="1.04"/>
                                        <circle cx="30.16" cy="17.68" r="1.04"/>
                                        <circle cx="32.24" cy="17.68" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="19.76" r="1.04"/> 
                                        <circle cx="3.12" cy="19.76" r="1.04"/> 
                                        <circle cx="5.20" cy="19.76" r="1.04"/> 
                                        <circle cx="7.28" cy="19.76" r="1.04"/> 
                                        <circle cx="9.36" cy="19.76" r="1.04"/> 
                                        <circle cx="11.44" cy="19.76" r="1.04"/> 
                                        <circle cx="13.52" cy="19.76" r="1.04"/> 
                                        <circle cx="15.6" cy="19.76" r="1.04"/> 
                                        <circle cx="17.68" cy="19.76" r="1.04"/> 
                                        <circle cx="19.76" cy="19.76" r="1.04"/> 
                                        <circle cx="21.84" cy="19.76" r="1.04"/>
                                        <circle cx="23.92" cy="19.76" r="1.04"/>
                                        <circle cx="26" cy="19.76" r="1.04"/>
                                        <circle cx="28.08" cy="19.76" r="1.04"/>
                                        <circle cx="30.16" cy="19.76" r="1.04"/>
                                        <circle cx="32.24" cy="19.76" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="21.84" r="1.04"/> 
                                        <circle cx="3.12" cy="21.84" r="1.04"/> 
                                        <circle cx="5.20" cy="21.84" r="1.04"/> 
                                        <circle cx="7.28" cy="21.84" r="1.04"/> 
                                        <circle cx="9.36" cy="21.84" r="1.04"/> 
                                        <circle cx="11.44" cy="21.84" r="1.04"/> 
                                        <circle cx="13.52" cy="21.84" r="1.04"/> 
                                        <circle cx="15.6" cy="21.84" r="1.04"/> 
                                        <circle cx="17.68" cy="21.84" r="1.04"/> 
                                        <circle cx="19.76" cy="21.84" r="1.04"/> 
                                        <circle cx="21.84" cy="21.84" r="1.04"/>
                                        <circle cx="23.92" cy="21.84" r="1.04"/>
                                        <circle cx="26" cy="21.84" r="1.04"/>
                                        <circle cx="28.08" cy="21.84" r="1.04"/>
                                        <circle cx="30.16" cy="21.84" r="1.04"/>
                                        <circle cx="32.24" cy="21.84" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="23.92" r="1.04"/> 
                                        <circle cx="3.12" cy="23.92" r="1.04"/> 
                                        <circle cx="5.20" cy="23.92" r="1.04"/> 
                                        <circle cx="7.28" cy="23.92" r="1.04"/> 
                                        <circle cx="9.36" cy="23.92" r="1.04"/> 
                                        <circle cx="11.44" cy="23.92" r="1.04"/> 
                                        <circle cx="13.52" cy="23.92" r="1.04"/> 
                                        <circle cx="15.6" cy="23.92" r="1.04"/> 
                                        <circle cx="17.68" cy="23.92" r="1.04"/> 
                                        <circle cx="19.76" cy="23.92" r="1.04"/> 
                                        <circle cx="21.84" cy="23.92" r="1.04"/>
                                        <circle cx="23.92" cy="23.92" r="1.04"/>
                                        <circle cx="26" cy="23.92" r="1.04"/>
                                        <circle cx="28.08" cy="23.92" r="1.04"/>
                                        <circle cx="30.16" cy="23.92" r="1.04"/>
                                        <circle cx="32.24" cy="23.92" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="26" r="1.04"/> 
                                        <circle cx="3.12" cy="26" r="1.04"/> 
                                        <circle cx="5.20" cy="26" r="1.04"/> 
                                        <circle cx="7.28" cy="26" r="1.04"/> 
                                        <circle cx="9.36" cy="26" r="1.04"/> 
                                        <circle cx="11.44" cy="26" r="1.04"/> 
                                        <circle cx="13.52" cy="26" r="1.04"/> 
                                        <circle cx="15.6" cy="26" r="1.04"/> 
                                        <circle cx="17.68" cy="26" r="1.04"/> 
                                        <circle cx="19.76" cy="26" r="1.04"/> 
                                        <circle cx="21.84" cy="26" r="1.04"/>
                                        <circle cx="23.92" cy="26" r="1.04"/>
                                        <circle cx="26" cy="26" r="1.04"/>
                                        <circle cx="28.08" cy="26" r="1.04"/>
                                        <circle cx="30.16" cy="26" r="1.04"/>
                                        <circle cx="32.24" cy="26" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="28.08" r="1.04"/> 
                                        <circle cx="3.12" cy="28.08" r="1.04"/> 
                                        <circle cx="5.20" cy="28.08" r="1.04"/> 
                                        <circle cx="7.28" cy="28.08" r="1.04"/> 
                                        <circle cx="9.36" cy="28.08" r="1.04"/> 
                                        <circle cx="11.44" cy="28.08" r="1.04"/> 
                                        <circle cx="13.52" cy="28.08" r="1.04"/> 
                                        <circle cx="15.6" cy="28.08" r="1.04"/> 
                                        <circle cx="17.68" cy="28.08" r="1.04"/> 
                                        <circle cx="19.76" cy="28.08" r="1.04"/> 
                                        <circle cx="21.84" cy="28.08" r="1.04"/>
                                        <circle cx="23.92" cy="28.08" r="1.04"/>
                                        <circle cx="26" cy="28.08" r="1.04"/>
                                        <circle cx="28.08" cy="28.08" r="1.04"/>
                                        <circle cx="30.16" cy="28.08" r="1.04"/>
                                        <circle cx="32.24" cy="28.08" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="30.16" r="1.04"/> 
                                        <circle cx="3.12" cy="30.16" r="1.04"/> 
                                        <circle cx="5.20" cy="30.16" r="1.04"/> 
                                        <circle cx="7.28" cy="30.16" r="1.04"/> 
                                        <circle cx="9.36" cy="30.16" r="1.04"/> 
                                        <circle cx="11.44" cy="30.16" r="1.04"/> 
                                        <circle cx="13.52" cy="30.16" r="1.04"/> 
                                        <circle cx="15.6" cy="30.16" r="1.04"/> 
                                        <circle cx="17.68" cy="30.16" r="1.04"/> 
                                        <circle cx="19.76" cy="30.16" r="1.04"/> 
                                        <circle cx="21.84" cy="30.16" r="1.04"/>
                                        <circle cx="23.92" cy="30.16" r="1.04"/>
                                        <circle cx="26" cy="30.16" r="1.04"/>
                                        <circle cx="28.08" cy="30.16" r="1.04"/>
                                        <circle cx="30.16" cy="30.16" r="1.04"/>
                                        <circle cx="32.24" cy="30.16" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="32.24" r="1.04"/> 
                                        <circle cx="3.12" cy="32.24" r="1.04"/> 
                                        <circle cx="5.20" cy="32.24" r="1.04"/> 
                                        <circle cx="7.28" cy="32.24" r="1.04"/> 
                                        <circle cx="9.36" cy="32.24" r="1.04"/> 
                                        <circle cx="11.44" cy="32.24" r="1.04"/> 
                                        <circle cx="13.52" cy="32.24" r="1.04"/> 
                                        <circle cx="15.6" cy="32.24" r="1.04"/> 
                                        <circle cx="17.68" cy="32.24" r="1.04"/> 
                                        <circle cx="19.76" cy="32.24" r="1.04"/> 
                                        <circle cx="21.84" cy="32.24" r="1.04"/>
                                        <circle cx="23.92" cy="32.24" r="1.04"/>
                                        <circle cx="26" cy="32.24" r="1.04"/>
                                        <circle cx="28.08" cy="32.24" r="1.04"/>
                                        <circle cx="30.16" cy="32.24" r="1.04"/>
                                        <circle cx="32.24" cy="32.24" r="1.04"/> 
                                    </g>
                                </symbol>
                                <use href="#a"/>
                                <use x="33.33" href="#a"/>
                                <use x="66.66" href="#a"/>
                                <use y="33.33" href="#a"/>
                                <use x="33.33" y="33.33" href="#a"/>
                                <use x="66.66" y="33.33" href="#a"/>
                                <use y="66.66" href="#a"/>
                                <use x="33.33" y="66.66" href="#a"/>
                                <use x="66.66" y="66.66" href="#a"/>
                            </mask>
                            <path d="M0 0h100v100H0z" mask="url(#b)" fill="var(--canvas-svg)"/>
                        </svg>
                        <svg class="canvas-grid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <mask id="b">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <symbol id="a">
                                    <circle cx="1.04" cy="1.04" r="1.04"/> 
                                    <circle cx="3.12" cy="1.04" r="1.04"/> 
                                    <circle cx="5.20" cy="1.04" r="1.04"/> 
                                    <circle cx="7.28" cy="1.04" r="1.04"/> 
                                    <circle cx="9.36" cy="1.04" r="1.04"/> 
                                    <circle cx="11.44" cy="1.04" r="1.04"/>
                                    <circle cx="13.52" cy="1.04" r="1.04"/>
                                    <circle cx="15.6" cy="1.04" r="1.04"/>
                                    <circle cx="17.68" cy="1.04" r="1.04"/>
                                    <circle cx="19.76" cy="1.04" r="1.04"/>
                                    <circle cx="21.84" cy="1.04" r="1.04"/>
                                    <circle cx="23.92" cy="1.04" r="1.04"/>
                                    <circle cx="26" cy="1.04" r="1.04"/>
                                    <circle cx="28.08" cy="1.04" r="1.04"/>
                                    <circle cx="30.16" cy="1.04" r="1.04"/>
                                    <circle cx="32.24" cy="1.04" r="1.04"/>
                                    <g>
                                        <circle cx="1.04" cy="3.12" r="1.04"/> 
                                        <circle cx="3.12" cy="3.12" r="1.04"/> 
                                        <circle cx="5.20" cy="3.12" r="1.04"/> 
                                        <circle cx="7.28" cy="3.12" r="1.04"/> 
                                        <circle cx="9.36" cy="3.12" r="1.04"/> 
                                        <circle cx="11.44" cy="3.12" r="1.04"/> 
                                        <circle cx="13.52" cy="3.12" r="1.04"/> 
                                        <circle cx="15.6" cy="3.12" r="1.04"/> 
                                        <circle cx="17.68" cy="3.12" r="1.04"/> 
                                        <circle cx="19.76" cy="3.12" r="1.04"/> 
                                        <circle cx="21.84" cy="3.12" r="1.04"/>
                                        <circle cx="23.92" cy="3.12" r="1.04"/>
                                        <circle cx="26" cy="3.12" r="1.04"/>
                                        <circle cx="28.08" cy="3.12" r="1.04"/>
                                        <circle cx="30.16" cy="3.12" r="1.04"/>
                                        <circle cx="32.24" cy="3.12" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="5.20" r="1.04"/> 
                                        <circle cx="3.12" cy="5.20" r="1.04"/> 
                                        <circle cx="5.20" cy="5.20" r="1.04"/> 
                                        <circle cx="7.28" cy="5.20" r="1.04"/> 
                                        <circle cx="9.36" cy="5.20" r="1.04"/> 
                                        <circle cx="11.44" cy="5.20" r="1.04"/> 
                                        <circle cx="13.52" cy="5.20" r="1.04"/> 
                                        <circle cx="15.6" cy="5.20" r="1.04"/> 
                                        <circle cx="17.68" cy="5.20" r="1.04"/> 
                                        <circle cx="19.76" cy="5.20" r="1.04"/> 
                                        <circle cx="21.84" cy="5.20" r="1.04"/>
                                        <circle cx="23.92" cy="5.20" r="1.04"/>
                                        <circle cx="26" cy="5.20" r="1.04"/>
                                        <circle cx="28.08" cy="5.20" r="1.04"/>
                                        <circle cx="30.16" cy="5.20" r="1.04"/>
                                        <circle cx="32.24" cy="5.20" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="7.28" r="1.04"/> 
                                        <circle cx="3.12" cy="7.28" r="1.04"/> 
                                        <circle cx="5.20" cy="7.28" r="1.04"/> 
                                        <circle cx="7.28" cy="7.28" r="1.04"/> 
                                        <circle cx="9.36" cy="7.28" r="1.04"/> 
                                        <circle cx="11.44" cy="7.28" r="1.04"/> 
                                        <circle cx="13.52" cy="7.28" r="1.04"/> 
                                        <circle cx="15.6" cy="7.28" r="1.04"/> 
                                        <circle cx="17.68" cy="7.28" r="1.04"/> 
                                        <circle cx="19.76" cy="7.28" r="1.04"/> 
                                        <circle cx="21.84" cy="7.28" r="1.04"/>
                                        <circle cx="23.92" cy="7.28" r="1.04"/>
                                        <circle cx="26" cy="7.28" r="1.04"/>
                                        <circle cx="28.08" cy="7.28" r="1.04"/>
                                        <circle cx="30.16" cy="7.28" r="1.04"/>
                                        <circle cx="32.24" cy="7.28" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="9.36" r="1.04"/> 
                                        <circle cx="3.12" cy="9.36" r="1.04"/> 
                                        <circle cx="5.20" cy="9.36" r="1.04"/> 
                                        <circle cx="7.28" cy="9.36" r="1.04"/> 
                                        <circle cx="9.36" cy="9.36" r="1.04"/> 
                                        <circle cx="11.44" cy="9.36" r="1.04"/> 
                                        <circle cx="13.52" cy="9.36" r="1.04"/> 
                                        <circle cx="15.6" cy="9.36" r="1.04"/> 
                                        <circle cx="17.68" cy="9.36" r="1.04"/> 
                                        <circle cx="19.76" cy="9.36" r="1.04"/> 
                                        <circle cx="21.84" cy="9.36" r="1.04"/>
                                        <circle cx="23.92" cy="9.36" r="1.04"/>
                                        <circle cx="26" cy="9.36" r="1.04"/>
                                        <circle cx="28.08" cy="9.36" r="1.04"/>
                                        <circle cx="30.16" cy="9.36" r="1.04"/>
                                        <circle cx="32.24" cy="9.36" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="11.44" r="1.04"/> 
                                        <circle cx="3.12" cy="11.44" r="1.04"/> 
                                        <circle cx="5.20" cy="11.44" r="1.04"/> 
                                        <circle cx="7.28" cy="11.44" r="1.04"/> 
                                        <circle cx="9.36" cy="11.44" r="1.04"/> 
                                        <circle cx="11.44" cy="11.44" r="1.04"/> 
                                        <circle cx="13.52" cy="11.44" r="1.04"/> 
                                        <circle cx="15.6" cy="11.44" r="1.04"/> 
                                        <circle cx="17.68" cy="11.44" r="1.04"/> 
                                        <circle cx="19.76" cy="11.44" r="1.04"/> 
                                        <circle cx="21.84" cy="11.44" r="1.04"/>
                                        <circle cx="23.92" cy="11.44" r="1.04"/>
                                        <circle cx="26" cy="11.44" r="1.04"/>
                                        <circle cx="28.08" cy="11.44" r="1.04"/>
                                        <circle cx="30.16" cy="11.44" r="1.04"/>
                                        <circle cx="32.24" cy="11.44" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="13.52" r="1.04"/> 
                                        <circle cx="3.12" cy="13.52" r="1.04"/> 
                                        <circle cx="5.20" cy="13.52" r="1.04"/> 
                                        <circle cx="7.28" cy="13.52" r="1.04"/> 
                                        <circle cx="9.36" cy="13.52" r="1.04"/> 
                                        <circle cx="11.44" cy="13.52" r="1.04"/> 
                                        <circle cx="13.52" cy="13.52" r="1.04"/> 
                                        <circle cx="15.6" cy="13.52" r="1.04"/> 
                                        <circle cx="17.68" cy="13.52" r="1.04"/> 
                                        <circle cx="19.76" cy="13.52" r="1.04"/> 
                                        <circle cx="21.84" cy="13.52" r="1.04"/>
                                        <circle cx="23.92" cy="13.52" r="1.04"/>
                                        <circle cx="26" cy="13.52" r="1.04"/>
                                        <circle cx="28.08" cy="13.52" r="1.04"/>
                                        <circle cx="30.16" cy="13.52" r="1.04"/>
                                        <circle cx="32.24" cy="13.52" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="15.6" r="1.04"/> 
                                        <circle cx="3.12" cy="15.6" r="1.04"/> 
                                        <circle cx="5.20" cy="15.6" r="1.04"/> 
                                        <circle cx="7.28" cy="15.6" r="1.04"/> 
                                        <circle cx="9.36" cy="15.6" r="1.04"/> 
                                        <circle cx="11.44" cy="15.6" r="1.04"/> 
                                        <circle cx="13.52" cy="15.6" r="1.04"/> 
                                        <circle cx="15.6" cy="15.6" r="1.04"/> 
                                        <circle cx="17.68" cy="15.6" r="1.04"/> 
                                        <circle cx="19.76" cy="15.6" r="1.04"/> 
                                        <circle cx="21.84" cy="15.6" r="1.04"/>
                                        <circle cx="23.92" cy="15.6" r="1.04"/>
                                        <circle cx="26" cy="15.6" r="1.04"/>
                                        <circle cx="28.08" cy="15.6" r="1.04"/>
                                        <circle cx="30.16" cy="15.6" r="1.04"/>
                                        <circle cx="32.24" cy="15.6" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="17.68" r="1.04"/> 
                                        <circle cx="3.12" cy="17.68" r="1.04"/> 
                                        <circle cx="5.20" cy="17.68" r="1.04"/> 
                                        <circle cx="7.28" cy="17.68" r="1.04"/> 
                                        <circle cx="9.36" cy="17.68" r="1.04"/> 
                                        <circle cx="11.44" cy="17.68" r="1.04"/> 
                                        <circle cx="13.52" cy="17.68" r="1.04"/> 
                                        <circle cx="15.6" cy="17.68" r="1.04"/> 
                                        <circle cx="17.68" cy="17.68" r="1.04"/> 
                                        <circle cx="19.76" cy="17.68" r="1.04"/> 
                                        <circle cx="21.84" cy="17.68" r="1.04"/>
                                        <circle cx="23.92" cy="17.68" r="1.04"/>
                                        <circle cx="26" cy="17.68" r="1.04"/>
                                        <circle cx="28.08" cy="17.68" r="1.04"/>
                                        <circle cx="30.16" cy="17.68" r="1.04"/>
                                        <circle cx="32.24" cy="17.68" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="19.76" r="1.04"/> 
                                        <circle cx="3.12" cy="19.76" r="1.04"/> 
                                        <circle cx="5.20" cy="19.76" r="1.04"/> 
                                        <circle cx="7.28" cy="19.76" r="1.04"/> 
                                        <circle cx="9.36" cy="19.76" r="1.04"/> 
                                        <circle cx="11.44" cy="19.76" r="1.04"/> 
                                        <circle cx="13.52" cy="19.76" r="1.04"/> 
                                        <circle cx="15.6" cy="19.76" r="1.04"/> 
                                        <circle cx="17.68" cy="19.76" r="1.04"/> 
                                        <circle cx="19.76" cy="19.76" r="1.04"/> 
                                        <circle cx="21.84" cy="19.76" r="1.04"/>
                                        <circle cx="23.92" cy="19.76" r="1.04"/>
                                        <circle cx="26" cy="19.76" r="1.04"/>
                                        <circle cx="28.08" cy="19.76" r="1.04"/>
                                        <circle cx="30.16" cy="19.76" r="1.04"/>
                                        <circle cx="32.24" cy="19.76" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="21.84" r="1.04"/> 
                                        <circle cx="3.12" cy="21.84" r="1.04"/> 
                                        <circle cx="5.20" cy="21.84" r="1.04"/> 
                                        <circle cx="7.28" cy="21.84" r="1.04"/> 
                                        <circle cx="9.36" cy="21.84" r="1.04"/> 
                                        <circle cx="11.44" cy="21.84" r="1.04"/> 
                                        <circle cx="13.52" cy="21.84" r="1.04"/> 
                                        <circle cx="15.6" cy="21.84" r="1.04"/> 
                                        <circle cx="17.68" cy="21.84" r="1.04"/> 
                                        <circle cx="19.76" cy="21.84" r="1.04"/> 
                                        <circle cx="21.84" cy="21.84" r="1.04"/>
                                        <circle cx="23.92" cy="21.84" r="1.04"/>
                                        <circle cx="26" cy="21.84" r="1.04"/>
                                        <circle cx="28.08" cy="21.84" r="1.04"/>
                                        <circle cx="30.16" cy="21.84" r="1.04"/>
                                        <circle cx="32.24" cy="21.84" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="23.92" r="1.04"/> 
                                        <circle cx="3.12" cy="23.92" r="1.04"/> 
                                        <circle cx="5.20" cy="23.92" r="1.04"/> 
                                        <circle cx="7.28" cy="23.92" r="1.04"/> 
                                        <circle cx="9.36" cy="23.92" r="1.04"/> 
                                        <circle cx="11.44" cy="23.92" r="1.04"/> 
                                        <circle cx="13.52" cy="23.92" r="1.04"/> 
                                        <circle cx="15.6" cy="23.92" r="1.04"/> 
                                        <circle cx="17.68" cy="23.92" r="1.04"/> 
                                        <circle cx="19.76" cy="23.92" r="1.04"/> 
                                        <circle cx="21.84" cy="23.92" r="1.04"/>
                                        <circle cx="23.92" cy="23.92" r="1.04"/>
                                        <circle cx="26" cy="23.92" r="1.04"/>
                                        <circle cx="28.08" cy="23.92" r="1.04"/>
                                        <circle cx="30.16" cy="23.92" r="1.04"/>
                                        <circle cx="32.24" cy="23.92" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="26" r="1.04"/> 
                                        <circle cx="3.12" cy="26" r="1.04"/> 
                                        <circle cx="5.20" cy="26" r="1.04"/> 
                                        <circle cx="7.28" cy="26" r="1.04"/> 
                                        <circle cx="9.36" cy="26" r="1.04"/> 
                                        <circle cx="11.44" cy="26" r="1.04"/> 
                                        <circle cx="13.52" cy="26" r="1.04"/> 
                                        <circle cx="15.6" cy="26" r="1.04"/> 
                                        <circle cx="17.68" cy="26" r="1.04"/> 
                                        <circle cx="19.76" cy="26" r="1.04"/> 
                                        <circle cx="21.84" cy="26" r="1.04"/>
                                        <circle cx="23.92" cy="26" r="1.04"/>
                                        <circle cx="26" cy="26" r="1.04"/>
                                        <circle cx="28.08" cy="26" r="1.04"/>
                                        <circle cx="30.16" cy="26" r="1.04"/>
                                        <circle cx="32.24" cy="26" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="28.08" r="1.04"/> 
                                        <circle cx="3.12" cy="28.08" r="1.04"/> 
                                        <circle cx="5.20" cy="28.08" r="1.04"/> 
                                        <circle cx="7.28" cy="28.08" r="1.04"/> 
                                        <circle cx="9.36" cy="28.08" r="1.04"/> 
                                        <circle cx="11.44" cy="28.08" r="1.04"/> 
                                        <circle cx="13.52" cy="28.08" r="1.04"/> 
                                        <circle cx="15.6" cy="28.08" r="1.04"/> 
                                        <circle cx="17.68" cy="28.08" r="1.04"/> 
                                        <circle cx="19.76" cy="28.08" r="1.04"/> 
                                        <circle cx="21.84" cy="28.08" r="1.04"/>
                                        <circle cx="23.92" cy="28.08" r="1.04"/>
                                        <circle cx="26" cy="28.08" r="1.04"/>
                                        <circle cx="28.08" cy="28.08" r="1.04"/>
                                        <circle cx="30.16" cy="28.08" r="1.04"/>
                                        <circle cx="32.24" cy="28.08" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="30.16" r="1.04"/> 
                                        <circle cx="3.12" cy="30.16" r="1.04"/> 
                                        <circle cx="5.20" cy="30.16" r="1.04"/> 
                                        <circle cx="7.28" cy="30.16" r="1.04"/> 
                                        <circle cx="9.36" cy="30.16" r="1.04"/> 
                                        <circle cx="11.44" cy="30.16" r="1.04"/> 
                                        <circle cx="13.52" cy="30.16" r="1.04"/> 
                                        <circle cx="15.6" cy="30.16" r="1.04"/> 
                                        <circle cx="17.68" cy="30.16" r="1.04"/> 
                                        <circle cx="19.76" cy="30.16" r="1.04"/> 
                                        <circle cx="21.84" cy="30.16" r="1.04"/>
                                        <circle cx="23.92" cy="30.16" r="1.04"/>
                                        <circle cx="26" cy="30.16" r="1.04"/>
                                        <circle cx="28.08" cy="30.16" r="1.04"/>
                                        <circle cx="30.16" cy="30.16" r="1.04"/>
                                        <circle cx="32.24" cy="30.16" r="1.04"/> 
                                    </g>
                                    <g>
                                        <circle cx="1.04" cy="32.24" r="1.04"/> 
                                        <circle cx="3.12" cy="32.24" r="1.04"/> 
                                        <circle cx="5.20" cy="32.24" r="1.04"/> 
                                        <circle cx="7.28" cy="32.24" r="1.04"/> 
                                        <circle cx="9.36" cy="32.24" r="1.04"/> 
                                        <circle cx="11.44" cy="32.24" r="1.04"/> 
                                        <circle cx="13.52" cy="32.24" r="1.04"/> 
                                        <circle cx="15.6" cy="32.24" r="1.04"/> 
                                        <circle cx="17.68" cy="32.24" r="1.04"/> 
                                        <circle cx="19.76" cy="32.24" r="1.04"/> 
                                        <circle cx="21.84" cy="32.24" r="1.04"/>
                                        <circle cx="23.92" cy="32.24" r="1.04"/>
                                        <circle cx="26" cy="32.24" r="1.04"/>
                                        <circle cx="28.08" cy="32.24" r="1.04"/>
                                        <circle cx="30.16" cy="32.24" r="1.04"/>
                                        <circle cx="32.24" cy="32.24" r="1.04"/> 
                                    </g>
                                </symbol>
                                <use href="#a"/>
                                <use x="33.33" href="#a"/>
                                <use x="66.66" href="#a"/>
                                <use y="33.33" href="#a"/>
                                <use x="33.33" y="33.33" href="#a"/>
                                <use x="66.66" y="33.33" href="#a"/>
                                <use y="66.66" href="#a"/>
                                <use x="33.33" y="66.66" href="#a"/>
                                <use x="66.66" y="66.66" href="#a"/>
                            </mask>
                            <path d="M0 0h100v100H0z" mask="url(#b)" fill="var(--canvas-svg)"/>
                        </svg>
                    </div>

                    <canvas id="artBoard" height="480px" width="480"></canvas>
                </div>
            </div>
        `;
    }

    constructor() {
        super();

        //attach root
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['size'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        //Will not persist because we're literally re-rendering every time we update the props
        if (prop === 'size') this.render()
    }

    get size() {
        return this.getAttribute("size");
    }
    set size(val) {
        this.setAttribute('size', val);
    }

    connectedCallback() {
        //render
        this.render();
    }

    disconnectedCallback() {
        
    }

}

customElements.define('mosaic-canvas', MosaicCanvas);