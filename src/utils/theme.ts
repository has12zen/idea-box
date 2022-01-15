import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	colors: {
		black: '#000',
		white: '#707070',
	},
});

export default theme;