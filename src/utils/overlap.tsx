function checkOverlapUpdate(w: string, x: string, y: string, id: string,props: any) {
	if (w === x && y != '' && w === '') {
		props.onUpdateNote(id, { bucket: y });
	}
}
function overlaps(id: string, bucket: string,props:any) {
	let draggables = document.getElementsByClassName('react-draggable-note');
	console.log(Array.from(draggables).length);
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
				const bucket2 = oItem.getAttribute('bucket');
				const isInHoriztonalBounds =
					rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
				const isInVerticalBounds =
					rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
				result = isInHoriztonalBounds && isInVerticalBounds;
				// setCollision(result);
				if (result) {
					// console.table({ bucket,bucket1,bucket2, result}) ;
					flag = true;
					checkOverlapUpdate(
						bucket,
						bucket1 ? bucket1 : '',
						bucket2 ? bucket2 : '',
						id
						,props
					);
					checkOverlapUpdate(
						bucket,
						bucket2 ? bucket2 : '',
						bucket1 ? bucket1 : '',
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

export {overlaps, checkOverlapUpdate};
