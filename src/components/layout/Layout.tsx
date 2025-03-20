import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
};