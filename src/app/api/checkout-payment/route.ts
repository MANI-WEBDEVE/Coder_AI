import Stripe from "stripe";
import { convex } from "@/lib/ConvexClient";
import { api } from "../../../../convex/_generated/api";
const stripe = new Stripe(process.env.SECRET_KEY_STRIPE! as string);

export async function POST(req:Request) {
  try {
    const {userId, price, token,userToken } = await req.json(); // Frontend se price aur tokens ayenge
    console.log({ price, token })
    if (!price || price <= 0) {
      return Response.json({ error: "Invalid price" }, { status: 400 });
    }


    if (!userId || token == null) {
      return Response.json({ error: "userId and token are required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment", // Single-time payment
      payment_method_types: ["card"],
      payment_intent_data: {},
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${token} Tokens`, // Dynamic Token Name
            },
            unit_amount:  Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: process.env.PAYMENT_SUCCESS!,
      cancel_url: process.env.PAYMENT_CANCEL!,
    });
    const updateTokenUser=await convex.mutation(api.users.updateToken, {
      userId,
      token:Number(token+userToken)
    })

    return Response.json({ url: session.url, data:updateTokenUser },{status:200});
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
