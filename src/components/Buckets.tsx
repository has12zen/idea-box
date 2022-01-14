import React from 'react';
import { useLocalStorage } from 'src/utils/useLocalStorage';
import _NoteValue, { defaultNote, colours } from 'src/utils/_NoteValue';
import {
	Flex,
	Box,
	Heading,
	Spacer,
	Button,
	Tooltip,
	IconButton,
} from '@chakra-ui/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import _BucketValue from 'src/utils/_BucketValue';
import { Rnd } from 'react-rnd';

interface BucketProps {
	buckets: _BucketValue[];
	DeleteBucket: (id: string) => void;
	UpdateBucket: (id: string, props: any) => void;
}

const Buckets: React.FC<BucketProps> = (props) => {
	function onPostionChange(id: string, x: number, y: number) {
		props.UpdateBucket(id, { x, y });
	}

	function onScaleChange(id: string, width: string, height: string) {
		props.UpdateBucket(id, { width, height });
	}

	const [_notes, setNotes] = useLocalStorage('notes', []);
	const loopBucket = () => {
		return props.buckets.map((bucket: _BucketValue) => {
			if (bucket.key)
				return (
					<>
						<Rnd
							default={{
								x: bucket.x,
								y: bucket.y,
								width: bucket.width === undefined ? '320px' : bucket.width,
								height: bucket.height === undefined ? '240px' : bucket.height,
							}}
							enable
							style={{ background: '#808080', borderWidth: '2px',borderColor:'#8090f0',borderRadius:'15px', color:'#fff' }}
							minHeight={200}
							minWidth={240}
							onDragStop={(e, d) => {
								onPostionChange(bucket.key, d.x, d.y);
							}}
							onResizeStop={(e, direction, ref, delta, position) => {
								onScaleChange(bucket.key, ref.style.width, ref.style.height);
							}}
						>
							<Box overflow="hidden">
								<Flex p="1">
									<Spacer />
									<Heading fontSize={'2xl'} fontFamily={'body'}>
										{bucket.title}
									</Heading>
									<Spacer />
									<Tooltip label="Delete bucket" color="red">
										<IconButton
											aria-label="delete bucket"
											variant="unstyled"
											color="red.600"
											onClick={() => {
												props.DeleteBucket(bucket.key);
											}}
											icon={<RiDeleteBin2Line />}
										/>
									</Tooltip>
								</Flex>
								<Box p="3">
									<Box
										mt="1"
										fontWeight="semibold"
										as="h4"
										style={{ whiteSpace: 'pre-line' }}
									></Box>
								</Box>
							</Box>
						</Rnd>
					</>
				);
		});
	};
	return <>{loopBucket()}</>;
};

export default Buckets;
