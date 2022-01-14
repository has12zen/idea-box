/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { boxesIntersect, useSelectionContainer } from 'react-drag-to-select';

const MouseSelection = React.memo(({ onSelectionChange }) => {
	const { DragSelection } = useSelectionContainer({
		onSelectionChange,
		onSelectionStart: () => {
			console.log('OnSelectionStart');
		},
		onSelectionEnd: () => console.log('OnSelectionEnd'),
    selectionProps: {
      style: {
        border: '2px dashed purple',
        borderRadius: 4,
        backgroundColor: 'brown',
        opacity: 0.5,
        marginTop: 90,
      },
    },
	});
	return <DragSelection />;
});

const App = (props) => {
	const [selectionBox, setSelectionBox] = useState();
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const selectableItems = useRef([]);
	useEffect(() => {
		const elementsContainer = document.getElementById('elements-container');
    // console.log('elementsContainer', elementsContainer);
		if (elementsContainer) {
			Array.from(elementsContainer.childNodes).forEach((item) => {
				const { left, top, width, height } = item.getBoundingClientRect();
        // console.log('item', item, top, left);
				selectableItems.current.push({
					left,
					top,
					width,
					height,
				});
			});
		}
	}, []);
	const handleSelectionChange = useCallback(
		(box) => {
			setSelectionBox(box);
			const indexesToSelect = [];
			selectableItems.current.forEach((item, index) => {
				if (boxesIntersect(box, item)) {
					indexesToSelect.push(index);
				}
			});
      // console.log('indexesToSelect', indexesToSelect);
			setSelectedIndexes(indexesToSelect);
		},
		[selectableItems]
	);
	// console.log(props, 'selprops');
	return (
		<div className="container" style={{ padding: '50px' }}>
			<MouseSelection onSelectionChange={handleSelectionChange} />
			<div
				id="elements-container"
				style={{
					display: 'grid',
					gridTemplateColumns: '100px 100px 100px 100px',
					gap: '20px 20px',
				}}
				className="elements-container"
			>
				{props.children}
			</div>
		</div>
	);
};

export default App;
