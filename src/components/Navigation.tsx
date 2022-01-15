import {
	useDisclosure,
	Button,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Input,
	DrawerFooter,
	Flex,
	useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { WiSunrise, WiMoonWaxingCrescent2 } from 'react-icons/wi';
interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Button colorScheme="teal" onClick={onOpen}>
				<GiHamburgerMenu />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
			
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Flex>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<WiMoonWaxingCrescent2 />
								) : (
									<WiSunrise />
								)}
							</Button>
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<Input placeholder="Type here..." />
					</DrawerBody>
					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Navigation;
