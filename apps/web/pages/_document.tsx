import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="preload" href="/fonts/Pretendard-Regular.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Pretendard-Medium.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Pretendard-SemiBold.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Pretendard-Bold.otf" as="font" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    )
  }
}
