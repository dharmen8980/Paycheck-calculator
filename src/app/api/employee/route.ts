import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const rows = (await query("SELECT * FROM Employee")) as RowDataPacket[];
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, pay_period, gross_pay, medicare, social_security, net_pay } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const result = (await query(
      "INSERT INTO Employee (Name, Pay_period, Gross_pay, Medicare_tax, Social_security_tax, Net_pay) VALUES (?, ?, ?, ?, ?, ?)",
      [name, pay_period, gross_pay, medicare, social_security, net_pay]
    )) as ResultSetHeader;

    return NextResponse.json({ message: "Employee created successfully", id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
