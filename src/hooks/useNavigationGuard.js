import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";



const useNavigationGuard = () => {
  const router = useRouter();

  const { userInfo, setAuthModal } = useAppStore();

  const navigate = (url) => {
    if (url === '/' || userInfo) {
      router.push(url);
    } else {
      setAuthModal();
    }
  };

  return navigate;
};

export default useNavigationGuard;