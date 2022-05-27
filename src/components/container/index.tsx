import { FC, ReactNode } from "react";
import containerStyles from "./container.module.css";

interface containerProps {
    children: ReactNode;
}

const Container: FC<containerProps> = (props: containerProps) => {
    return (
        <div className={containerStyles.fullSize}>
            {props.children}
        </div>
    )
}

export default Container;