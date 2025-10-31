import { Analytics } from "@vercel/analytics/next"
import "./styles/globals.css"

export const metadata = {
  title: "박태환",
  description: "최고 품질의 커피 원두를 만나보세요",
  // generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
