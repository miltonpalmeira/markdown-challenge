export const metadata = {
    title: "Markdown Challenge",
    description: "A real-time collaborative Markdown editor that allows multiple users to simultaneously edit documents, with updates reflected in real-time.",
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  