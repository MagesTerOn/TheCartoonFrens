import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 27px;
  border-radius: 12px;
  border: none;
  background-color: #ffffff;
   
  font-weight: bold;
  color: #000000;
  width: 300px;    margin-top: 25px; font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
   
  border-radius: 100%;
  border: none;
  background-color: #ffffff;
  padding: 14px;
  font-weight: bold;
  font-size: 18px;
  color: #000000;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 400px;
  @media (min-width: 767px) {
    width: 450px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
 
   
  background-color: #ffffff;
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`2222 тут надо заменить текст`);
 
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
     
     
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

 
  
  


  var  WEI_COST = 1,
  DISPLAY_COST = 0.0,
  mintMaxAmount = 5;
  
  
  if (data.totalSupply < 2222) {
    
    var  WEI_COST = 1,
    DISPLAY_COST = 0.0,
    mintMaxAmount = 5 ;


   } else {  
    var  WEI_COST = 3300000000000000,
    DISPLAY_COST = 0.0033
    mintMaxAmount = 10;};

  const claimNFTs = () => {
   
 
    let cost =  WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
     
    }
    setMintAmount(newMintAmount); 
     
     
  };

  const incrementMintAmount = () => {

  let newMintAmount = mintAmount + 1; 
    

    if (mintMaxAmount <= 5){
      newMintAmount = 5 ;
      
    } else if ( mintMaxAmount >= 10 & newMintAmount  > 10) { newMintAmount = 10 ;};

 console.log(mintMaxAmount);
    setMintAmount(newMintAmount);
     
  };

  
 
 
  
    
 

var changerBTN =  "Free mint",
changertext = "",
btnmain = document.querySelectorAll('button');
 
 



if (data.totalSupply > 0 & data.totalSupply < 2222){
  
    var changertext = "You're eligible to mint";

  } else { 

  var changertext = ' ';  
 }; 
   


 if (data.totalSupply >= 2222){
  
  var changertext = "Public sale",
  changerBTN =  " Mint "; 
  
  btnmain.onclick = function() {  var  changertext = ' Public sale '  }; 

}; 




    if (mintMaxAmount <= 5){ 
      
      var  changerBTN =  "Free mint ";
      

    } else {    

   
   }; 

    
   

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
     
      <s.Container
        flex={1}
        ai={"center"}
        style={{
          minHeight: "525px",
        
        }}
       
         
      >
        
                 
         
        <ResponsiveWrapper flex={1}   test>
           
           
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
               
              padding: 24,
              borderRadius: 24,
              
            
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 70,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            ><span > <span class="totalcc"> {data.totalSupply} </span>/ {CONFIG.MAX_SUPPLY}</span>
               
            </s.TextTitle>
            <s.TextDescription
              style={{fontSize: "20px",
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
               
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ fontSize: "20px",  textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ fontSize: "20px", textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                > 
              {changertext} 
                 
                </s.TextTitle>
                <s.SpacerXSmall />
<s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                     
</s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription 
                      style={{fontSize: "20px",
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      2222 тут надо заменить текст
                                      
                      
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      Connect your wallet
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{ fontSize: "20px",
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{fontSize: "20px",
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                           
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{fontSize: "20px",
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount} / {mintMaxAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        { claimingNft ? "In progress ..." : changerBTN }
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          
          
        </ResponsiveWrapper>
         
    
      </s.Container>
   
  );
}

export default App;
