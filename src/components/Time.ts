export let time = 0;
export let deltaTime = 0;
export let timeScale = 1;
const scales = [0.25, 0.5, 0.75, 1, 2, 4, 8];

document.body.insertAdjacentHTML(
	"afterbegin",
	`<div class="time-scale-container">
			<span>${scales.at(0)}x</span>
			<input type="range" min="0" max="${scales.length - 1}" value="3" id="timeScaleSlider" />
			<span>${scales.at(-1)}x</span>
		</div>`
);

const timeScaleSlider = <HTMLInputElement>document.getElementById("timeScaleSlider");
timeScaleSlider.addEventListener("input", e => {
	if (!(e.target instanceof HTMLInputElement)) return;
	timeScale = scales[+e.target.value];
});

export function tick() {
	deltaTime = (performance.now() * 0.001 - time) * timeScale;
	time = performance.now() * 0.001;
}
