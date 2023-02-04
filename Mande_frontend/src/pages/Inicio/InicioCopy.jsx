import { useState, useContext } from "react";
import * as React from "react";
//import "./../App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RegisterT from "../RegisterT/RegisterT";
import RegisterC from "../RegisterC/RegisterC";
import Login from "../Login/Login";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Context } from "../../context/Context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className=""
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Inicio() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const context = useContext(Context);

  console.log(context);

  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs 
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Iniciar Sesión" {...a11yProps(0)} sx={{color:"white"}}/>
            <Tab label="Registrarse Como Cliente" {...a11yProps(1)} sx={{color:"white"}}/>
            <Tab label="Registrarse Como Trabajador" {...a11yProps(2)} sx={{color:"white"}}/>
          </Tabs>
     
        </Box>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterC />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RegisterT />
        </TabPanel>
      </Box>
    </div>
  );
}

export default Inicio;
