import "./globals.css";

export const metadata = {
  title: "Amigo Invisible TMF",
  description: "Sistema de Amigo Invisible"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
