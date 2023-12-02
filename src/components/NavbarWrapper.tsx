import { NavLink, Outlet } from 'react-router-dom';

type NavbarConfig = {
  path: string;
  label: string;
}[];

const navbarConfig: NavbarConfig = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/form-1',
    label: 'Form 1',
  },
  {
    path: '/form-2',
    label: 'Form 2',
  },
];

export const NavbarWrapper: React.FC = () => {
  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <nav className="mx-auto">
        <ul className="flex space-x-3 ">
          {navbarConfig.map((path, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={path.path}
                  className={({ isActive }) => {
                    return `block rounded-md p-2 font-semibold ${
                      isActive ? 'bg-blue-100 text-red-500' : 'bg-blue-500'
                    }`;
                  }}
                >
                  {path.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
