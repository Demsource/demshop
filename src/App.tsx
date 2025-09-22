import type React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {
  productsLoader,
  homeLoader,
  singleProductLoader,
} from "./services/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { lazy, Suspense, useEffect } from "react";
import { tryFetchingUser } from "./services/api/user";
import { updateProfile } from "./store/slices/authSlice";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ProtectedProfile from "./components/layout/ProtectedProfile";
import { tryGettingCartItems } from "./services/api/cart";
import { setCartItems } from "./store/slices/cartSlice";
import FallbackLoader from "./components/FallbackLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { tryGettingWishlistItems } from "./services/api/wishlist";
import { setWishlistItems } from "./store/slices/wishlistSlice";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const Orders = lazy(() => import("./pages/protected/Orders"));
const Settings = lazy(() => import("./pages/protected/Settings"));
const Wishlist = lazy(() => import("./pages/protected/Wishlist"));
const Admin = lazy(() => import("./pages/protected/Admin"));
const Cart = lazy(() => import("./pages/protected/Cart"));
const Checkout = lazy(() => import("./pages/protected/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Home />}
        loader={homeLoader}
        hydrateFallbackElement={<FallbackLoader />}
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="products"
        element={<Products />}
        loader={productsLoader}
        hydrateFallbackElement={<FallbackLoader />}
      />
      <Route
        path="product/:id"
        element={<Product />}
        loader={singleProductLoader}
        hydrateFallbackElement={<FallbackLoader />}
        errorElement={<NotFound />}
      />
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedProfile />}>
          <Route path="profile/orders" element={<Orders />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/wishlist" element={<Wishlist />} />
          <Route path="profile/admin" element={<Admin />} />
        </Route>

        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          const response = await tryFetchingUser(token);
          dispatch(updateProfile(response));
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    };
    checkUser();
  }, [token]);

  useEffect(() => {
    if (token) {
      const getCartItems = async () => {
        try {
          const response = await tryGettingCartItems(token);

          const data = response.map((item: any) => ({
            id: item.id,
            productId: item.cartProduct.id,
            name: item.cartProduct.title,
            description: item.cartProduct.description,
            price: item.cartProduct.salePrice || item.cartProduct.price,
            image: item.cartProduct.image,
            quantity: item.count,
          }));

          dispatch(setCartItems(data));
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      getCartItems();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getWishlistItems = async () => {
        try {
          const response = await tryGettingWishlistItems(token);

          const data = response.map((item: any) => ({
            id: item.id,
            productId: item.product_id,
            title: item.likedProduct.title,
            description: item.likedProduct.description,
            image: item.likedProduct.image,
            price: item.likedProduct.price,
            salePrice: item.likedProduct.salePrice,
            categoryName: item.likedProduct.category_name,
          }));

          dispatch(setWishlistItems(data));
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      getWishlistItems();
    }
  }, [token]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Suspense fallback={<FallbackLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
