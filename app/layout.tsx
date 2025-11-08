export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || "Ballot Match"}</h1>
          <p className="text-sm opacity-80">Answer questions, enter your address, see which candidates align and why</p>
        </header>
        {children}
      </body>
    </html>
  );
}
