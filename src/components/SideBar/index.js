import React from "react";
import "./SideBar.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: "#d9e296",
    "&:hover": {
      background: "#d9e296",
    },
  },
}));

const SideBar = ({ visualizeDijkstra, visualizeAStar }) => {
  const classes = useStyles();
  return (
    <div className="side-bar-container">
      <Button onClick={visualizeDijkstra} className={classes.button}>
        <Typography>Visiualise dijkstra</Typography>
      </Button>
      <Button onClick={visualizeAStar} className={classes.button}>
        <Typography>Visiualise A*</Typography>
      </Button>
    </div>
  );
};

export default SideBar;
