import '../styles/globals.css'

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 bg-no-repeat h-screen'>{children}</body>
        </html>
    )
}