export default function getSegmentConfig(segment: string) {
	return {
		shell: +segment[0],
		subShell: segment[1],
		electrons: +segment[2],
	};
}
