import { NextApiRequest, NextApiResponse } from "next";

// Mock database (replace with a real database in production)
let savings = [
  { amount: 100, date: "2024-11-01" },                                              { amount: 50, date: "2024-11-15" },
];
                                                                                  export default function handler(req: NextApiRequest, res: NextApiResponse) {        if (req.method === "GET") {
    // Fetch savings history
    res.status(200).json(savings);                                                  } else if (req.method === "POST") {
    // Add new saving
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ error: "Amount is required" });
      return;
    }
    const newEntry = { amount: Number(amount), date: new Date().toISOString() };
    savings.push(newEntry);                                                           res.status(201).json(newEntry);                                                 } else {
    res.setHeader("Allow", ["GET", "POST"]);                                          res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
