import React, { useState } from 'react';
import {
	ButtonGroup,
	Button,
	useDisclosure,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

interface EditComponentProps {
	title: string;
	editOnSubmit: () => void;
	editOnClose: () => void;
	editOnOpen: () => void;
	editIsOpen: boolean;
}

const Edit: React.FC<EditComponentProps> = (props) => {
	return (
		<>
			<Modal
				isCentered
				onClose={props.editOnClose}
				isOpen={props.editIsOpen}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{props.children}
					</ModalBody>
					<ModalFooter>
						<ButtonGroup d="flex" justifyContent="flex-end">
							<Button mr={3} variant="outline" onClick={props.editOnClose}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									props.editOnSubmit();
								}}
								colorScheme="teal"
							>
								Save
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Edit;
