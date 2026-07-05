import "./globals.css";

export const metadata = {
  title: "Amigo Invisible TMF",
  description: "Sistema de amigo invisible con buzón digital",
  icons: {
    icon: "/tmf-logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
