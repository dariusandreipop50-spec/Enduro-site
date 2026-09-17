import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      experience,
      tourPackage,
      details,
    } = body;

    if (!fullName || !email || !experience || !tourPackage) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Adventure Tours <bookings@yourdomain.com>",
      to: ["dariula23@gmail.com"],
      replyTo: email,
      subject: `New booking request from ${fullName}`,
      html: `
        <h2>New Booking Request</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Package:</strong> ${tourPackage}</p>

        <p><strong>Details:</strong></p>
        <p>${details || "No additional details provided."}</p>
      `,
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "Email could not be sent." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}