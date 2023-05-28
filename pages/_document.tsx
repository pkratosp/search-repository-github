// import { Html, Head, Main, NextScript } from 'next/document'
// import { CssBaseline } from '@nextui-org/react'
// import { Children } from 'react';

// export default function Document() {


//   return (
//     <Html lang="pt-br">
//       <Head>{CssBaseline.flush()}</Head>
//       <body className="bg-bg_body">
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx:any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
