import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full p-4">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;