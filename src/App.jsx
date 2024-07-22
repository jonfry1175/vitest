import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const Customer = lazy(() => import("./pages/dashboard/customers/Customer"));
const Product = lazy(() => import("./pages/dashboard/products/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Transactions = lazy(() =>
  import("./pages/dashboard/transactions/Transactions")
);
import { axiosInstance } from "./lib/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newToken = response.data.data.token;
      if (response.data.status.code === 201) {
        localStorage.setItem("token", newToken);
        dispatch({ type: "SET_TOKEN", token: newToken });
        console.log('token refreshed');
      } else {
        console.log("failed to refresh token");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 1000 * 60 * 30); // 30 menit
    // Membersihkan interval ketika komponen unmount atau dependensi berubah
    return () => clearInterval(intervalId);
  }, [token, dispatch]);
  

  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<Product />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
