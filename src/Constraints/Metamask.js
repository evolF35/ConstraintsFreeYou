

import React, {useState} from 'react'
import {ethers}  from 'ethers'
import deployABI from '../ABI/DeployABI.json'


const MetamaskJS = () => {

  let contractAddress = '0xFf408125bf10064a4518f9aDa10b0E2124FAA807';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
          window.ethereum.request({ method: 'eth_requestAccounts'})
          .then(result => {
              accountChangedHandler(result[0]);
              setConnButtonText('Wallet Connected');
          })
          .catch(error => {
              setErrorMessage(error.message);
          
          });

      } else {
          console.log('Need to install MetaMask');
          setErrorMessage('Please install MetaMask browser extension to interact');
      }
  }
  const accountChangedHandler = (newAccount) => {
      setDefaultAccount(newAccount);
      updateEthers();
  }

  const chainChangedHandler = () => {
      window.location.reload();
  }

  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      let tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);
      let tempContract = new ethers.Contract(contractAddress, deployABI, tempSigner);
      setContract(tempContract);	
  }

  


    
}

export default MetamaskJS