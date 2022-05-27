import { FC } from "react";
import styledTitle from "./styledTitle.module.css";

interface titleProps {
    text: string;
}

const StyledTitle: FC<titleProps> = (props: titleProps) => {
    return  <h1 className={styledTitle.title}>{props.text}</h1>

}

export default StyledTitle;