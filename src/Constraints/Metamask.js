

import React, {useState} from 'react'
import {ethers}  from 'ethers'

const MetamaskJS = () => {

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [address, setAddress] = useState(null)

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setProvider(provider);
                setSigner(signer);
                setAddress(address);
                console.log("Connected to Metamask");
            } catch (err) {
                console.log("Failed to connect to Metamask");
            }
        } else {
            console.log("Metamask not installed");
        }
    }

    const disconnectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
                setProvider(null);
                setSigner(null);
                setAddress(null);
                console.log("Disconnected from Metamask");
            } catch (err) {
                console.log("Failed to disconnect from Metamask");
            }
        } else {
            console.log("Metamask not installed");
        }
    }

    return (
        <div>
            <button onClick={connectMetamask}>Connect</button>
            <button onClick={disconnectMetamask}>Disconnect</button>
        </div>
    )




}

export default MetamaskJS