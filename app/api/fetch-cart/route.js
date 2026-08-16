import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb'; // Adjust path as needed
import Product from '../../../models/Product'; // Adjust path as needed

export async function POST(req) {
  try {
    // Read the product IDs sent from the frontend
    const body = await req.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing product IDs' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Fetch all products whose _id is inside the productIds array
    const products = await Product.find({ _id: { $in: productIds } });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart products', details: error.message },
      { status: 500 }
    );
  }
}