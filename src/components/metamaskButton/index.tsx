import { ethers } from "ethers";
import { FC, useState } from "react";
import catApi from "../../configs/catApi";
import buttonStyles from "./metamaskButton.module.css";

// Definition preventing an error when the user does not use Metamask or other injected wallet.
const web3Window: any = window;
interface buttonProps {
    text: string;
}

const MetamaskButton: FC<buttonProps> = (props: buttonProps) => {
    const [buttonText, setButtonText] = useState(props.text);
    const [pictureUrl, setPictureUrl] = useState("");
    const [pictureWidth, setPictureWidth] = useState("");
    const [pictureHeight, setPictureHeight] = useState("");

    const signAMessage = async () => {
        if ("ethereum" in web3Window && web3Window.ethereum["isMetaMask"]) { 
            await web3Window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(web3Window.ethereum);
  
            const signer = provider.getSigner();
            await signer.signMessage(`This will not incur any fees. It is a read only message, it will grant you access to a cat photo.`)
            .then( async () => {
                     setButtonText("Sign another message.");
                     await fetch(catApi.endpoint, {
                        method: 'GET',
                        headers: { 'x-api-key': catApi.key },
                    })
                    .then( async (response: Response) => {
                        const catApiResponse = await response.json();
                        setPictureUrl(catApiResponse[0].url);
                        setPictureWidth("400px");
                        setPictureHeight("400px");
                      })
                      .catch( () => {
                        console.log('An unexpected error occured, when getting a cat.');
                        alert("Sorry, an error occured, try again.");
                    })
                      ;

                }

            );

        } else {
            alert("Please install or enable Metamask in this browser.");
        }
    }

    return  (
        <>
            <button onClick={signAMessage} className={buttonStyles.defaultButton}>{buttonText}</button>
            <img width={pictureWidth} height={pictureHeight} alt="" src={pictureUrl}></img> 
        </>
    )

}

export default MetamaskButton;