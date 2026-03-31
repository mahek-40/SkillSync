import { Header } from './Header';
import { Footer } from './Footer';

export function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
