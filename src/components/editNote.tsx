// import  FocusLock from "react-focus-lock"
import React, { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import {
	FormControl,
	FormLabel,
	Stack,
	Tooltip,
	ButtonGroup,
	Button,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	IconButton,
	Textarea,
} from '@chakra-ui/react';
import { FocusLock } from '@chakra-ui/focus-lock';

interface EditComponentProps {
	onEditText: (text: string) => void;
}

const Edit: React.FC<EditComponentProps> = (props) => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [note, setNote] = useState('');

	const firstFieldRef = React.useRef(null);
	return (
		<Popover
			isOpen={isOpen}
			initialFocusRef={firstFieldRef}
			onOpen={onOpen}
			onClose={onClose}
			placement="right"
			closeOnBlur={false}
		>
			<PopoverTrigger>
					<IconButton
						aria-label="Edit note"
						variant="unstyled"
						icon={
				<Tooltip label="Edit highlight">
						<EditIcon />
				</Tooltip>
						}
					/>
			</PopoverTrigger>
			<PopoverContent p={5}>
				<FocusLock persistentFocus={false}>
					<PopoverArrow />
					<Stack spacing={4}>
						<FormControl>
							<FormLabel>Note</FormLabel>
							<Textarea
								id="note"
								placeholder="Note"
								onChange={(event) => setNote(event.currentTarget.value)}
							/>
						</FormControl>
						<ButtonGroup d="flex" justifyContent="flex-end">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									props.onEditText(note);
									setNote('');
									onClose();
								}}
								colorScheme="teal"
							>
								Save
							</Button>
						</ButtonGroup>
					</Stack>
				</FocusLock>
			</PopoverContent>
		</Popover>
	);
};

export default Edit;
