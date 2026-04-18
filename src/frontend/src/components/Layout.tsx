import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (term: string) => void;
  searchValue?: string;
}

export function Layout({ children, onSearch, searchValue }: LayoutProps) {
  return (
    <div className="min-h-screen gradient-dark-bg flex flex-col">
      <Header onSearch={onSearch} searchValue={searchValue} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
