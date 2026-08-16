import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../models/Product'; // Adjust this path to where your schema is saved

export async function GET() {
  try {
    // 1. Establish the database connection
    await connectToDatabase();

    // 2. Fetch all products from the database
    // .find({}) returns all documents in the collection
    const products = await Product.find({});

    // 3. Return the products to the frontend
    return NextResponse.json(
      { 
        success: true, 
        count: products.length,
        data: products 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Failed to fetch products:', error);

    // 4. Handle errors gracefully
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}