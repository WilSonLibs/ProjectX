import { NextApiRequest, NextApiResponse } from "next";

// Mock balance (replace with a real database in production)
let balance = 1000;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Handle withdrawal
    const { amount } = req.body; // Extract amount from the request body
    const withdrawAmount = Number(amount); // Convert amount to a number

    if (!amount || withdrawAmount <= 0) {
      res.status(400).json({ error: "Invalid withdrawal amount" });
      return;
    }

    if (withdrawAmount > balance) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    balance -= withdrawAmount;
    res.status(200).json({
      message: "Withdrawal successful",
      remainingBalance: balance,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
