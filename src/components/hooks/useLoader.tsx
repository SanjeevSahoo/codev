import { useAppDispacth } from "src/store/hooks";
import { showLoader, hideLoader } from "src/store/loaderSlice";

const useLoader = () => {
  const dispatch = useAppDispacth();
  return {
    show: () => {
      dispatch(showLoader());
    },
    hide: () => {
      dispatch(hideLoader());
    },
  };
};

export default useLoader;
