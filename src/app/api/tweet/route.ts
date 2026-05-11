import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function POST(req: NextRequest) {
  try {
    const { name, ticker, description, telegram, twitter } = await req.json();

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    const tweet = await client.v2.tweet(
      `🚀 New token deployed on Forge!\n\n$${ticker} - ${name}\n${description}\n\n🔗 Trade: https://forge-rho-eight.vercel.app\n📱 Telegram: ${telegram || "N/A"}\n🐦 Twitter: ${twitter || "N/A"}\n\n#Base #Crypto #${ticker} #Forge`
    );

    return NextResponse.json({ success: true, tweet });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
