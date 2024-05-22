import express from "express";

const app = express();
app.use(express.json());

let ETH_BALANCE = 200;

let USDC_BALANCE = 700000;

app.post("/buy-asset", (req, res) => {
    const quantity = req.body.quantity;

    const updatedETHQuantity = ETH_BALANCE - quantity;
    const updatedUSDCBalance = ETH_BALANCE * USDC_BALANCE / updatedETHQuantity;
    const paidAmount = updatedUSDCBalance - USDC_BALANCE;

    ETH_BALANCE = updatedETHQuantity;
    USDC_BALANCE = updatedUSDCBalance;

    res.json({
        message: `You paid ${paidAmount} USDC for ${quantity} ETH.`
    })
})

app.post("/sell-asset", (req, res) => {
    const quantity = req.body.quantity;

    const updatedETHQuantity = ETH_BALANCE + quantity;
    const updatedUSDCBalance = ETH_BALANCE * USDC_BALANCE / updatedETHQuantity;
    const gotUSDC = USDC_BALANCE - updatedUSDCBalance;

    ETH_BALANCE = updatedETHQuantity;
    USDC_BALANCE = updatedUSDCBalance;

    res.json({
        message: `You got ${gotUSDC} USDC for ${quantity} ETH.`
    })
})

app.listen(3000);