import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../components/layout/NavBar";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        justifyContent="space-between"
        gap="0.5rem"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
