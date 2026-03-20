import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { NotificationProvider } from "@/context/NotificationContext"

export const metadata = {
  title: "Buy Cake Tools Online | Prime Cake Tools",
  description: "Best cake tools, chocolate, ingredients online store",
  keywords: ["cake tools", "baking tools", "chocolate", "cake decoration"],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <Header />
          {children}
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  )
}