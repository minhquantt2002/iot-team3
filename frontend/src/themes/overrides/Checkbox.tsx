import { Theme } from "@mui/material";

const Checkbox = (theme: Theme) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light,
        },
      },
    },
  };
};

export default Checkbox;
