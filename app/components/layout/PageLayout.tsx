import Navigation from "../Navigation";
import Footer from "../Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
