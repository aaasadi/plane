import * as React from "react";
import { ISvgIcons } from "../type";
import { ChevronLeftIcon } from "./chevron-left";
import { ChevronRightIcon } from "./chevron-right";

export const ChevronStartIcon: React.FC<ISvgIcons> = ({ color = "currentColor", ...rest }) => {
  const isRTL: boolean = document.dir === 'rtl';
  return isRTL ? <ChevronRightIcon color={color} {...rest} /> : <ChevronLeftIcon color={color} {...rest} />;
}