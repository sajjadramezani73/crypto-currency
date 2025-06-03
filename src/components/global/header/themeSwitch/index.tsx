import type { IGlobalState } from "@/redux/type";
import { useDispatch, useSelector } from "react-redux";

import { themeAction } from "@/redux/slices/public/theme";

import { MoonIconOutlined, SunIconOutlined } from "@/components/icons";

const ThemeSwitch = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state: IGlobalState) => state.theme);
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        dispatch(themeAction.changeTheme());
      }}
    >
      {theme === "dark" ? <MoonIconOutlined size={25} /> : <SunIconOutlined />}
    </div>
  );
};

export default ThemeSwitch;
