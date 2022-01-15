import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from 'src/utils/theme';

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<ChakraProvider theme={theme}>
						<ColorModeScript initialColorMode={theme.config.initialColorMode} />
						<Main />
						<NextScript />
					</ChakraProvider>
				</body>
			</Html>
		);
	}
}
