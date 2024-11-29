import { NextApiRequest, NextApiResponse } from "next";

// Mock database (replace with a real database in production)
let archives = [
  { amount: 200, date: "2024-10-01", description: "Monthly savings" },              { amount: 150, date: "2024-09-15", description: "Emergency fund" },
];
                                                                                  export default function handler(req: NextApiRequest, res: NextApiResponse) {        if (req.method === "GET") {
    // Fetch archives
    res.status(200).json(archives);                                                 } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
