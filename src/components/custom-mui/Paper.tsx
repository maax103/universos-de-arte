import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";

const CustomPaper = styled(Paper)(({ theme }) => {
  if(theme.palette.mode === 'light')
    return {'boxShadow': '1px 3px 7px 0px #00000066'}
});

export default CustomPaper;