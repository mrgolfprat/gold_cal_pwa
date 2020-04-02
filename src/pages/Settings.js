// import "date-fns";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SketchPicker } from "react-color";
import { updateSettingStyle, saveBg } from "../redux/SettingStyleReducer";
import "./Settings.css";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  updateSettingValue,
  insertDataGroup,
  removeDataGroup
} from "../redux/SettingValueReducer";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { selectData } from "../redux/SettingValueReducer";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Resizer from "react-image-file-resizer";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

const useColorPicker = (name, property, color) => {
  const dispatch = useDispatch();
  const onChange = color => {
    dispatch(updateSettingStyle({ name, property, value: color.hex }));
  };

  return {
    color,
    onChange
  };
};

const useForm = (name, property, value) => {
  const dispatch = useDispatch();
  const onChange = e =>
    dispatch(updateSettingValue({ name, property, value: e.target.value }));

  return {
    value,
    onChange
  };
};

const DefaultColor = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  background: ${props => props.background ?? "#fff"};
  width: 30px;
  height: 30px;
  outline: none;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
`;

const Divider = styled.span`
  width: 100%;
  margin: 0.5rem auto;
`;

const ColorPicker = ({ name, property, color, type = "normal" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const insideColorPicker = useColorPicker(name, property, color);

  const open = Boolean(anchorEl);
  const id = open ? name : undefined;

  const dispatch = useDispatch();

  // for backgroud change
  const inputRef = useRef();
  const onFileChange = async e => {
    const file = e.target.files[0];
    try {
      const base64file = await toBase64(file);
      console.log(base64file);
      dispatch(saveBg(base64file));
    } catch (error) {
      alert("save backgroud error");
    }
  };

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => resolve(reader.result);
      // reader.onerror = err => reject(err);
      Resizer.imageFileResizer(
        file,
        window.innerWidth,
        window.innerHeight,
        "JPEG",
        100,
        0,
        uri => resolve(uri),
        "base64"
      );
    });

  return (
    <ColorPickerContainer>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
        accept="image/png, image/jpeg"
      />
      <DefaultColor
        aria-describedby={id}
        background={color}
        onClick={event => setAnchorEl(event.target)}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {type == "bg" ? (
          <SketchPicker
            color={insideColorPicker.color}
            onChange={color => {
              insideColorPicker.onChange(color);
              dispatch(saveBg(undefined));
            }}
          />
        ) : (
          <SketchPicker {...insideColorPicker} />
        )}
      </Popover>
      {type == "bg" ? (
        <DefaultColor
          aria-describedby={id}
          background={color}
          style={{
            marginLeft: 10,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => {
            console.log("eiei");
            inputRef.current.click();
          }}
        >
          IMG
        </DefaultColor>
      ) : (
        <Modal></Modal>
      )}
    </ColorPickerContainer>
  );
};

const useInput = (initial = "") => {
  const [value, setValue] = useState(initial);

  const onChange = e => setValue(e.target.value);
  return {
    value,
    onChange,
    setValue
  };
};

export default function Setting() {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const settingStyle = useSelector(state => state.settingStyle);
  const settingValue = useSelector(state => state.settingValue);

  const [open, setOpen] = useState(false);
  const modalValue = useInput();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showHideState, setShowHideState] = useState(true);

  return (
    <div
      className="setting-container"
      onClick={() => setShowHideState(prev => !prev)}
    >
      <FormLabel component="legend">Settings</FormLabel>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            Background
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="MainContainer"
            property="background"
            color={settingStyle.MainContainer.background}
            type="bg"
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Header#1"
            type="text"
            {...useForm("headerOne", "value", settingValue.headerOne.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="headerOne"
            property="color"
            color={settingStyle.headerOne.color}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Header#2"
            type="text"
            {...useForm("headerTwo", "value", settingValue.headerTwo.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="headerTwo"
            property="color"
            color={settingStyle.headerTwo.color}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Store name"
            type="text"
            {...useForm("headerThree", "value", settingValue.headerThree.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="headerThree"
            property="color"
            color={settingStyle.headerThree.color}
          />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            Color Label
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="dateTimeCountLabel"
            property="color"
            color={settingStyle.dateTimeCountLabel.color}
          />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            Color world
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="dateTimeCountValue"
            property="color"
            color={settingStyle.dateTimeCountValue.color}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Date"
            type="text"
            {...useForm("date", "value", settingValue.date.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <CssTextField
            label="Time"
            type="text"
            {...useForm("time", "value", settingValue.time.value)}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Count"
            type="text"
            {...useForm("count", "value", settingValue.count.value)}
          />
        </Grid>
      </Grid>

      <Divider />

      <FormLabel component="legend">Data Group</FormLabel>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="data-group"
            name="data-group"
            value={settingValue.dataGroup.dataSelect}
            onChange={e => dispatch(selectData(e.target.value))}
          >
            <Grid container spacing={2}>
              {settingValue.dataGroup.data.map(el => (
                <Grid item xs={6} key={el}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      value={el}
                      control={<Radio />}
                      label={el}
                    />
                    {settingValue.dataGroup.data.length > 1 ? (
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          if (el != settingValue.dataGroup.dataSelect) {
                            dispatch(removeDataGroup(el));
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                  </div>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Add
          </Button>
        </Grid>
      </Grid>

      <Divider />
      <FormLabel component="legend">Price Group</FormLabel>
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            Color Label
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="buySaleLabel"
            property="color"
            color={settingStyle.buySaleLabel.color}
          />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            Color world
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="buySaleValue"
            property="color"
            color={settingStyle.buySaleValue.color}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Buy"
            type="text"
            {...useForm("buy", "value", settingValue.buy.value)}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Sale"
            type="text"
            {...useForm("sale", "value", settingValue.sale.value)}
          />
        </Grid>

        <Grid item xs={8}>
          <CssTextField
            label="Copyright"
            type="text"
            {...useForm("copyright", "value", settingValue.copyright.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <ColorPicker
            name="copyright"
            property="color"
            color={settingStyle.copyright.color}
          />
        </Grid>
      </Grid>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20
        }}
      >
        <Slide direction="up" in={showHideState} mountOnEnter unmountOnExit>
          <Fab
            color="secondary"
            aria-label="home"
            onClick={() => history.push("/")}
          >
            <HomeIcon />
          </Fab>
        </Slide>
      </div>

      <Divider />

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            width: "80%",
            display: "flex",
            justifyContent: "space-between"
          }}
          className={classes.paper}
        >
          <CssTextField
            label="Add New"
            type="text"
            value={modalValue.value}
            onChange={modalValue.onChange}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const { value, setValue } = modalValue;
              dispatch(insertDataGroup(value));
              setValue("");
            }}
          >
            Add New
          </Button>
        </div>
      </Modal>
    </div>
  );
}
