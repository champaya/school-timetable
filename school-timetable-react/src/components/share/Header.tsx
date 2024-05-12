import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { CONSTANT } from "../../consts/constant";
import useDeleteAPI from "../../api/useDeleteAPI";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetFilterCondition } from "../../redux/slice/FilterLectureSlice";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const deleteAPI = useDeleteAPI();

  /**
   * メニューオープン時に発火
   *
   * @param e
   */
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  /**
   * メニュークローズ時に発火
   *
   * @param value メニューアイテムを押下した場合のメニューアイテム識別値
   */
  const handleCloseUserMenu = async (value?: number) => {
    setAnchorElUser(null);
    switch (value) {
      // 時間割ページに遷移
      case 1:
        navigate(CONSTANT.ROUTE.USER_TIMETABLE);
        break;
      // 授業一覧ページに遷移
      case 2:
        dispatch(resetFilterCondition());
        navigate(CONSTANT.ROUTE.LECTURES);
        break;
      // ログアウトしてからログインページに遷移
      case 3:
        await deleteAPI(`${CONSTANT.API.Auth}${CONSTANT.API.SIGN_OUT}`, true);
        Cookies.remove(CONSTANT.COOKIES.ACCESS_TOKEN);
        Cookies.remove(CONSTANT.COOKIES.CLIENT);
        Cookies.remove(CONSTANT.COOKIES.UID);
        Cookies.remove(CONSTANT.COOKIES.ID);
        navigate(CONSTANT.ROUTE.DEFAULT);
        break;
      // パスワードリセットページに遷移
      case 4:
        navigate(CONSTANT.ROUTE.RESET_PASSWORD);
        break;
    }
  };

  /**
   * ヘッダータイトル押下時に発火
   */
  const handleClickBack = () => {
    navigate(CONSTANT.ROUTE.USER_TIMETABLE);
  };

  const settings = [
    { content: "時間割ページへ", value: 1 },
    { content: "授業一覧ページへ", value: 2 },
    { content: "ログアウト", value: 3 },
    { content: "パスワード変更", value: 4 },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary", zIndex: "1" }}>
      <Container>
        {/* タイトル */}
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: "0.3rem",
              cursor: "pointer",
            }}
          >
            <span onClick={handleClickBack}>時間割</span>
          </Typography>

          {/* メニュー */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <Tooltip title="メニューを開く">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon
                  fontSize="large"
                  sx={{ color: "white", margin: "0.1rem" }}
                />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "3rem" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                handleCloseUserMenu();
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.value}
                  onClick={() => {
                    handleCloseUserMenu(setting.value);
                  }}
                >
                  <Typography textAlign="center">{setting.content}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
