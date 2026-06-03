// Root layout — html/body lives in [locale]/layout.tsx so locale-aware
// `lang` and metadata are correct. Next.js allows this pattern when a single
// dynamic segment ([locale]) is responsible for the document shell.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
