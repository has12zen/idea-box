/* eslint-disable react/display-name */
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback,  useState } from 'react';
import { boxesIntersect, useSelectionContainer } from 'react-drag-to-select';
import _NoteValue from 'src/utils/_NoteValue';
import Note from './Note';

interface StandardProps {
	notes: _NoteValue[];
	onDelete: (id: string) => void;
	onUpdateNote: (id: string, data: any) => void;
	assignNotesToBucket: (selectIndexs: number[], bucket: string) => void;
}

const StandardView: React.FC<StandardProps> = (props) => {
	const [selectionBox, setSelectionBox] = useState();
	const [selectedIndexes, setSelectedIndexes] = useState<any[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [_bucket, setBucket] = useState('');
	const notes = props.notes;

	const handleSelectionChange = useCallback((box) => {
		setSelectionBox(box);
		const indexesToSelect: any[] = [];
		const elementsContainer = document.getElementsByClassName(
			'react-draggable-note'
		);
		if (elementsContainer) {
			Array.from(elementsContainer).forEach((item, index) => {
				const { left, top, width, height } = item.getBoundingClientRect();
				if(boxesIntersect(box,({left, top, width, height}))) {
					indexesToSelect.push(index);
				}
			});
		}
		setSelectedIndexes(indexesToSelect);
	}, []);

	function onPostionChange(id: string, x: number, y: number) {
		props.onUpdateNote(id, { x, y });
	}

	function onScaleChange(id: string, width: string, height: string) {
		props.onUpdateNote(id, { width, height });
	}

	const loopNotes = () => {
		return notes.map((note: _NoteValue, index) => {
			if (note.key)
				return (
					<Note
						key={note.key}
						note={note}
						onDelete={props.onDelete}
						onPositionChange={onPostionChange}
						onScaleChange={onScaleChange}
						onUpdateNote={props.onUpdateNote}
						classname={selectedIndexes.includes(index) ? 'selected' : ''}
					/>
				);
		});
	};
	const closeModal = () => {
		setSelectedIndexes([]);
		onClose();
	}
	const { DragSelection } = useSelectionContainer({
		onSelectionChange: handleSelectionChange,
		selectionProps: {
			style: {
				border: '2px dashed purple',
				borderRadius: 4,
				backgroundColor: 'brown',
				opacity: 0.4,
				marginTop: 90,
			},
		},
		onSelectionEnd: () => {
			// console.log('selection end', selectedIndexes);
			if (selectedIndexes.length > 0) {
				onOpen();
			}
		},
	});
	// console.log(props, 'selprops');
	return (
		<div className="container" style={{ padding: '50px' }}>
			<DragSelection />
			<div
				id="elements-container"
				style={{
					display: 'grid',
					gridTemplateColumns: '100px 100px 100px 100px',
					gap: '20px 20px',
				}}
				className="elements-container"
			>
				{loopNotes()}
			</div>
			<Modal
				isCentered
				onClose={closeModal}
				isOpen={isOpen}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Assign bucket to selection</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Bucket</FormLabel>
							<Input
								id="bucket"
								placeholder="Bucket"
								value={_bucket}
								onChange={(event) => setBucket(event.currentTarget.value)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup d="flex" justifyContent="flex-end">
							<Button mr={3} variant="outline" onClick={closeModal}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									props.assignNotesToBucket(selectedIndexes, _bucket.trim());
									closeModal();
								}}
								colorScheme="teal"
							>
								Save
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default StandardView;
