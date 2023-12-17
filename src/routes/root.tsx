import { Outlet } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex items-center justify-center border-t border-t-gray-200 p-2">
      &copy; {new Date().getFullYear()} Aman.
    </footer>
  );
}

export function Header() {
  return <header className="flex items-center justify-center border-b border-b-gray-200 p-2 h-16"></header>;
}

export default function Root() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1 h-full">
        {/* <!-- Main content --> */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
