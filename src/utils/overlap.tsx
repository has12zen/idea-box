function checkOverlapUpdate(
	w: string,
	x: string,
	y: string,
	id: string,
	props: any
) {
	if (w === x && y != '' && w === '') {
		props.onUpdateNote(id, { bucket: y });
	}
	if (w === y && x != '' && w === '') {
		props.onUpdateNote(id, { bucket: x });
	}
}
function chekcOverlap1(
	w: string,
	x: string,
	y: string,
	id: string,
	props: any
) {
	if (w === x && x !== y) {
		props.onUpdateNote(id, { bucket: y });
	}
	if (w === y && x !== y) {
		props.onUpdateNote(id, { bucket: x });
	}
}
function overlaps(id: string, bucket: string, props: any, mode: number) {
	let draggables = document.getElementsByClassName('react-draggable-note');
	// console.log(Array.from(draggables).length);
	let result = false;
	let draggablesLength = Array.from(draggables).length;
	for (let i = 0; i < draggablesLength; i++) {
		let item = draggables[i] as HTMLElement;
		let flag = false;
		for (let j = 0; j < draggablesLength; j++) {
			if (i !== j) {
				let oItem = draggables[j] as HTMLElement;
				const rect1 = item.getBoundingClientRect();
				const rect2 = oItem.getBoundingClientRect();
				const bucket1 = item.getAttribute('bucket');
				const b1=bucket1?bucket1:''.trim();
				const bucket2 = oItem.getAttribute('bucket');
				const b2=bucket2?bucket2:''.trim();
				const isInHoriztonalBounds =
					rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
				const isInVerticalBounds =
					rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
				result = isInHoriztonalBounds && isInVerticalBounds;
				// setCollision(result);
				if (result) {
					// console.table({ bucket,bucket1,bucket2, result}) ;
					flag = true;
					if (mode == 1)
						checkOverlapUpdate(
							bucket.trim(),
				b1,
						b2,
							id,
							props
						);
					else
						chekcOverlap1(
							bucket.trim(),
							b1,
							b2,
							id,
							props
						);
					break;
				}
			}
		}
		if (flag) break;
	}
	return false;
}

export { overlaps, checkOverlapUpdate };
