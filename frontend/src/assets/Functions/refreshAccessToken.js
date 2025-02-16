const refreshRefreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  if (refreshToken) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userBalance");
    window.location.reload();
  }
};

export default refreshRefreshToken;
