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

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
  const handleCloseUserMenu = (value?: number) => {
    setAnchorElUser(null);
    switch (value) {
      // 時間割ページに遷移
      case 1:
        navigate(CONSTANT.ROUTE.USER_TIMETABLE);
        break;
      // ログアウトしてからログインページに遷移
      case 2:
        deleteAPI(`${CONSTANT.API.Auth}${CONSTANT.API.SIGN_OUT}`, true).then(
          () => {
            navigate(CONSTANT.ROUTE.DEFAULT);
          }
        );
        break;
      // パスワードリセットページに遷移
      case 3:
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
    { content: "ログアウト", value: 2 },
    { content: "パスワードを変更", value: 3 },
  ];

  return (
    <>
      {/* ログイン画面のときのみ非表示とする */}
      {location.pathname !== "/" && (
        <AppBar
          position="static"
          sx={{ backgroundColor: "primary", zIndex: "1" }}
        >
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
                      <Typography textAlign="center">
                        {setting.content}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};

export default Header;
