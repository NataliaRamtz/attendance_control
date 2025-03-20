import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="flex items-center hover:text-blue-600">
        <Home className="h-4 w-4" />
      </Link>
      {paths.map((path, index) => (
        <div key={path} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className="capitalize hover:text-blue-600"
          >
            {path.replace('-', ' ')}
          </Link>
        </div>
      ))}
    </nav>
  );
};