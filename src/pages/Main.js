import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NumberFormat } from "../libs/NumberFormat";
import Fab from "@material-ui/core/Fab";
import SettingsIcon from "@material-ui/icons/Settings";
import "./Main.css";
import { useHistory } from "react-router-dom";
import Slide from "@material-ui/core/Slide";

const MainContainer = styled.div`
  color: white;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: 100vh;
  background: ${props =>
    props.imgBackground
      ? `url(${props.imgBackground}) no-repeat`
      : props.background ?? "#282c34"};
  background-size: cover;
  background-position: center;
  font-family: ${props => props["font-family"] ?? "Kanit"};
`;

const HeadRegular = styled.div`
  color: ${props => (props["color"] ? props["color"] : "white")};
  font-size: ${props => props["font-size"] ?? "1.5"}rem;
`;

const HeadBold = styled(HeadRegular)`
  font-weight: bold;
`;

const HeadTwo = styled.div`
  color: ${props => props["color"] ?? "white"};
  font-size: ${props => props["font-size"] ?? "1.5"}rem;
  margin: 1rem 0;
`;

const Label = styled.label`
  color: ${props => props["color"] ?? "teal"};
  font-size: ${props => props["font-size"] ?? "1"}rem;
`;

const Value = styled.span`
  padding: 0 1rem;
  display: inline-block;
  color: ${props => props["color"] ?? "white"};
  font-size: ${props => props["font-size"] ?? "1"}rem;
`;

const Copyright = styled.div`
  color: ${props => props["color"] ?? "blueviolet"};
  font-size: ${props => props["font-size"] ?? "1"}rem;
`;

const FabGroup = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-flow: column nowrap;

  justify-content: space-between;
`;

export default function Main() {
  const history = useHistory();
  const settingStyle = useSelector(state => state.settingStyle);
  const settingValue = useSelector(state => state.settingValue);
  const [showHideState, setShowHideState] = useState(true);

  return (
    <MainContainer
      {...settingStyle.MainContainer}
      onClick={() => setShowHideState(prev => !prev)}
    >
      <HeadRegular {...settingStyle.headerOne}>
        {settingValue.headerOne.value}
      </HeadRegular>
      <HeadTwo {...settingStyle.headerTwo}>
        {settingValue.headerTwo.value}
      </HeadTwo>
      <HeadBold {...settingStyle.headerThree}>
        {settingValue.headerThree.value}
      </HeadBold>

      <div className="date-time-count">
        <Label {...settingStyle.dateTimeCountLabel}>
          {settingValue.date.key}
        </Label>
        <Value {...settingStyle.dateTimeCountValue}>
          {settingValue.date.value}
        </Value>
        <Label {...settingStyle.dateTimeCountLabel}>
          {settingValue.time.key}
        </Label>
        <Value {...settingStyle.dateTimeCountValue}>
          {settingValue.time.value}
        </Value>
        <Label {...settingStyle.dateTimeCountLabel}>
          {settingValue.count.key}
        </Label>
        <Value {...settingStyle.dateTimeCountValue}>
          {settingValue.count.value}
        </Value>
      </div>
      <HeadRegular {...settingStyle.headerFour}>
        {settingValue.dataGroup.dataSelect}
      </HeadRegular>

      <div className="buy-sale">
        <Label {...settingStyle.buySaleLabel}>{settingValue.buy.key}</Label>
        <Value {...settingStyle.buySaleValue}>
          {NumberFormat(settingValue.buy.value)}
        </Value>
        <Label {...settingStyle.buySaleLabel}>{settingValue.sale.key}</Label>
        <Value {...settingStyle.buySaleValue}>
          {NumberFormat(settingValue.sale.value)}
        </Value>
      </div>

      <Copyright {...settingStyle.copyright}>Copyright</Copyright>

      <FabGroup>
        <Slide direction="up" in={showHideState} mountOnEnter unmountOnExit>
          <Fab
            color="secondary"
            aria-label="settings"
            onClick={() => history.push("/settings")}
          >
            <SettingsIcon />
          </Fab>
        </Slide>
      </FabGroup>
    </MainContainer>
  );
}
