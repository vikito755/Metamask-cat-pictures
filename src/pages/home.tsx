import { FC } from "react";
import Container from "../components/container";
import MetamaskButton from "../components/metamaskButton";
import StyledTitle from "../components/styledTitle";

const Home: FC = () => {
    return (
        <Container>
            <StyledTitle text="Would you like a cat picture?"></StyledTitle>
            <MetamaskButton text="Sign a message (with Metamask)"></MetamaskButton>
        </Container>
    ) 
}

export default Home;