import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { NotificationProvider } from "@/context/NotificationContext"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import AuthErrorModal from "@/components/AuthErrorModal"

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
          <AuthProvider>
            <CartProvider>
              <AuthErrorModal />
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}