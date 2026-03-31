import { Header } from './Header';

export function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-base overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full">
                <div className="container-custom py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
