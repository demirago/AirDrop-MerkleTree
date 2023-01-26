import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import KECCAK256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import { Buffer } from "buffer/";

import './App.css';

import artifact from './artifacts/contracts/MerkleDistributor.sol/MerkleDistributor.json'
const CONTRACT_ADDRESS = '"address"'

window.Buffer = window.Buffer || Buffer;


function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [tree, setTree] = useState(undefined)
  const [proof, setProof] = useState([])


  useEffect(() => {
      const onLoad = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)

        const contract = await new ethers.Contract(
          CONTRACT_ADDRESS,
          artifact.abi,
          provider
        )
        setContract(contract)

        const tree = await getTree()
        setTree(tree)
      }
      onLoad()
  }, [])

  const isConnected = () => (signer !== undefined)


  const connect = () => {
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
    })
  }


  const getTree = async () => {
    const indexedAddresses = require('./walletAddresses.json');

    const addresses = []
    Object.keys(indexedAddresses).forEach(function(idx) {
      addresses.push(indexedAddresses[idx])
    })

    const leaves = addresses.map(x => KECCAK256(x))
    const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true })

    return tree
  }

  const getSigner = async provider => {
    const signer = provider.getSigner();

    await signer.getAddress()
      .then((address) => {
        setSignerAddress(address)

        const proof = tree.getHexProof(KECCAK256(address))
        setProof(proof)
      })

    return signer;
  }

  const claimAirdrop = async () => {
    await contract.connect(signer).claim(proof)
  }



  return (
    <div className="App">
      <header className="App-header">

        {isConnected() ? (
          <div>
            <h1>AIRDROP APP</h1>
            <p>
              Welcome {signerAddress?.substring(0,10)}...
            </p>
            <div className="list-group">
              <div className="list-group-item">

                <button
                  className="btn btn-success"
                  onClick={() => claimAirdrop()}>
                  Claim
                </button>

              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>AIRDROP APP</h1>
            <p>
              You are not connected
            </p>
            <button onClick={connect} className="btn btn-primary">Connect Metamask</button>
          </div>
        )}
 
      </header>
    </div>
  );
}

export default App;