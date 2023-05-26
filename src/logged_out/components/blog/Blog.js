import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import BlogCard from "./BlogCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TablaCliente } from "./AcountTable";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});

function Blog(props) {
  return (
    <Box display="flex" justifyContent="center">
      <div>
        <TablaCliente />
      </div>
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(Blog);
