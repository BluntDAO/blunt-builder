import { NextApiRequest, NextApiResponse } from "next";
import { getProposals } from "@/services/nouns-builder/governor";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Invalid address parameter" });
  }

  try {
    const proposals = await getProposals({ address: address as `0x${string}` });

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    res.setHeader(
      "Cache-Control",
      `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
    );
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ 
      error: "Failed to fetch proposals",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export default handler;
