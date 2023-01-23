
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ethers} from 'ethers'

import deployABI from '../ABI/Deploy.json'
import claimABI from '../ABI/Claim.json'
import poolABI from '../ABI/Pool.json'


let defaultAccount;


const depToPOS = async (event,Addr1) => {
    event.preventDefault();
    let tempProvider2 = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner2 = tempProvider2.getSigner();
    let tempContract3 = new ethers.Contract(Addr1, poolABI, tempSigner2);
    let stringNum = (event.target[0].value).toString();
    let deus = ethers.utils.parseEther(stringNum);

    await tempContract3.depositToPOS({value:deus});
}

	const depToNEG = async (event,Addr1) => {
		event.preventDefault();
		let tempProvider2 = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner2 = tempProvider2.getSigner();
		let tempContract3 = new ethers.Contract(Addr1, poolABI, tempSigner2);
		let stringNum = (event.target[0].value).toString();
		let deus = ethers.utils.parseEther(stringNum);

		await tempContract3.depositToNEG({value:deus});
	}

	const approveNEG = async (event,Addr1,Addr2) => {
		
		event.preventDefault();
		
		let tempProvider2 = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner2 = tempProvider2.getSigner();

		let tempContract44 = new ethers.Contract(Addr1, claimABI, tempProvider2);
		let tempContract3 = new ethers.Contract(Addr1, claimABI, tempSigner2);

		let balance = await tempContract44.balanceOf(defaultAccount);

		await tempContract3.approve(Addr2,balance);
	}

	const approvePOS = async (event,Addr1,Addr2) => {
		
		event.preventDefault();
		
		let tempProvider2 = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner2 = tempProvider2.getSigner();

		let tempContract44 = new ethers.Contract(Addr1, claimABI, tempProvider2);
		let tempContract3 = new ethers.Contract(Addr1, claimABI, tempSigner2);


		let balance = await tempContract44.balanceOf(defaultAccount);

		await tempContract3.approve(Addr2,balance);
	}
	const callContractFunction = async (event, contractAddress, functionName) => {
		event.preventDefault();
		
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner = tempProvider.getSigner();
		
		let tempContract = new ethers.Contract(contractAddress, poolABI, tempSigner);
	  
		switch (functionName) {
		  case 'redeemwithPOS':
			await tempContract.redeemWithPOS();
			break;
		  case 'redeemwithNEG':
			await tempContract.redeemWithNEG();
			break;
		  case 'withdrawNEG':
			await tempContract.withdrawWithNEG();
			break;
		  case 'withdrawPOS':
			await tempContract.withdrawWithPOS();
			break;
		  case 'settle':
			await tempContract.settle();
			break;
		  case 'makeWithdrawable':
			await tempContract.turnWithdrawOn();
			break;
		  case 'deZtruction':
			await tempContract.turnToDust();
			break;
		  default:
			throw new Error(`Invalid function name: ${functionName}`);
		}
	  }







function createData(modifiedTB) {

  let data = modifiedTB;
  if (!data.zTOTBAL) return null;

  return {
    totalBalance: data.zTOTBAL,
    POSBalance: data.zPOSBal,
    NEGBalance: data.zNEGBal,
    SettlementPrice: data.args[1].toString(),
    SettlementDate: data.args[2].toString(),
    DecayRate: data.args[3].toString(),
    MaxRatio: data.args[4].toString(),
    MaxRatioDate: data.args[5].toString(),
    PastSettlementDate: data.zPSDATE.toString(),
    Condition: data.zCONDITION,
    DiscountRate: data.zDVALUE,
    Withdraw: data.zWITHDRAW,
    details: [
      {
        ContractAddress: data.args[8],
        OracleAddress: data.transactionHash,
        Name: data.args[6],
        Acronym: data.args[7],
        DestructionDate: data.args[9].toString(),
        POSAddress: data.zPOSADD,
        NEGAddress: data.zNEGADD,
      },
    ],
  };
}


function Row(props) {
  let row = props;
  const [open, setOpen] = React.useState(false);

  if (!row) return null;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.row.totalBalance}</TableCell>
        <TableCell align="right">{row.row.POSBalance}</TableCell>
        <TableCell align="right">{row.row.NEGBalance}</TableCell>
        <TableCell align="right">{row.row.SettlementPrice}</TableCell>
        <TableCell align="right">{row.row.SettlementDate}</TableCell>
        <TableCell align="right">{row.row.DecayRate}</TableCell>
        <TableCell align="right">{row.row.MaxRatio}</TableCell>
        <TableCell align="right">{row.row.MaxRatioDate}</TableCell>
        <TableCell align="right">{row.row.PastSettlementDate}</TableCell>
        <TableCell align="right">{row.row.Condition}</TableCell>
        <TableCell align="right">{row.row.DiscountRate}</TableCell>
        <TableCell align="right">{row.row.Withdraw}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pool Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Contract Address</TableCell>
                    <TableCell>Oracle Address</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell > Acronym </TableCell>
                    <TableCell > DestructionDate </TableCell>
                    <TableCell > POS Address </TableCell>
                    <TableCell > NEG Address </TableCell>

                    <TableCell > Deposit To POS </TableCell>
                    <TableCell > Deposit To NEG </TableCell>
                    <TableCell > Approve POS </TableCell>
                    <TableCell > Approve NEG </TableCell>

                    <TableCell > Redeem POS</TableCell>
                    <TableCell > Redeem NEG </TableCell>

                    <TableCell > Withdraw POS </TableCell>
                    <TableCell > Withdraw NEG </TableCell>

                    <TableCell > Settle </TableCell>
                    <TableCell >  TurnWithdrawOn </TableCell>
                    <TableCell >  DESTRUCTION </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                <TableRow >
                      <TableCell component="th" scope="row">{row.row.details[0].ContractAddress}</TableCell>
                      <TableCell>{row.row.details[0].OracleAddress}</TableCell>
                      <TableCell align="right">{row.row.details[0].Name}</TableCell>
                      <TableCell align="right">{row.row.details[0].Acronym}</TableCell>
                      <TableCell align="right">{row.row.details[0].DestructionDate}</TableCell>
                      <TableCell align="right">{row.row.details[0].POSAddress}</TableCell>
                      <TableCell align="right">{row.row.details[0].NEGAddress}</TableCell>
                      <TableCell> <form className='deposit' onSubmit={(e) => depToPOS(e, row.row.details[0].ContractAddress.toString())}> <input  type="text" ></input> <button type="submit" >POS</button> </form> </TableCell>
                      <TableCell> <form className='deposit' onSubmit={(e) => depToNEG(e, row.row.details[0].ContractAddress.toString())}> <input  type="text" ></input> <button type="submit" >NEG</button> </form> </TableCell>
                      <TableCell> <form className='approvePOS' onSubmit={(e) => approvePOS(e, row.row.details[0].POSAddress.toString() ,row.row.details[0].ContractAddress.toString())}> <button type="submit" >Approve POS </button> </form> </TableCell>
                      <TableCell> <form className='approveNEG' onSubmit={(e) => approveNEG(e, row.row.details[0].NEGAddress.toString() ,row.row.details[0].ContractAddress.toString())}> <button type="submit" >Approve NEG </button> </form> </TableCell>
                      <TableCell> <form className='redeemPOS' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'redeemwithPOS')}> <button type="submit" >Redeem POS </button> </form> </TableCell>
                      <TableCell> <form className='redeemNEG' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'redeemwithNEG')}> <button type="submit" >Redeem NEG </button> </form> </TableCell>
                      <TableCell> <form className='withdrawPOS' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'withdrawPOS')}> <button type="submit" >Withdraw POS </button> </form> </TableCell>
                      <TableCell> <form className='withdrawNEG' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'withdrawNEG')}> <button type="submit" >Withdraw NEG </button> </form> </TableCell>
                      <TableCell> <form className='settle' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'settle')}> <button type="submit" > Settle </button> </form> </TableCell>
                      <TableCell> <form className='turnwithdrawon' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'makeWithdrawable')}> <button type="submit" > TurnWithdrawOn </button> </form> </TableCell>
                      <TableCell> <form className='SelfDestruct' onSubmit={(e) => callContractFunction(e, row.row.details[0].ContractAddress.toString(),'deZtruction')}> <button type="submit" > DESTRUCTION </button> </form></TableCell>

                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
      totalBalance: PropTypes.string,
      POSBalance: PropTypes.string,
      NEGBalance: PropTypes.string,
      SettlementPrice: PropTypes.string,
      SettlementDate: PropTypes.string,
      DecayRate: PropTypes.string,
      MaxRatio: PropTypes.string,
      MaxRatioDate: PropTypes.string,
      PastSettlementDate: PropTypes.string,
      Condition: PropTypes.string,
      DiscountRate: PropTypes.string,
      Withdraw: PropTypes.string,
      details: PropTypes.arrayOf(PropTypes.shape({
          ContractAddress: PropTypes.string,
          OracleAddress: PropTypes.string,
          Name: PropTypes.string,
          Acronym: PropTypes.string,
          DestructionDate: PropTypes.string,
          POSAddress: PropTypes.string,
          NEGAddress: PropTypes.string,
      }))
  }).isRequired,
};





export default function CollapsibleTable(props) {

  let florins = props.rows;
  defaultAccount = props.defaultAccount;


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Total Balance</TableCell>
            <TableCell align="right"> POS Balance </TableCell>
            <TableCell align="right"> NEG Balance </TableCell>
            <TableCell align="right"> Settlement Price </TableCell>
            <TableCell align="right"> Settlement Date </TableCell>
            <TableCell align="right"> Decay Rate </TableCell>
            <TableCell align="right"> Max Ratio </TableCell>
            <TableCell align="right"> Max Ratio Date </TableCell>
            <TableCell align="right"> PastSettlement Date </TableCell>
            <TableCell align="right"> Condition </TableCell>
            <TableCell align="right"> Discount Rate </TableCell>
            <TableCell align="right"> Withdraw </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
{florins.map((row) => {
   const data = createData(row);
   return data ? <Row key={data.contractAddress} row={data} /> : null;
})}

</TableBody>
      </Table>
    </TableContainer>
  );
}


