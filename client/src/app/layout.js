import { NotificationProvider } from "@/context/NotificationContext"
import AuthErrorModal from "@/components/AuthErrorModal"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          {children}
        </NotificationProvider>
        <AuthErrorModal />
      </body>
    </html>
  )
}