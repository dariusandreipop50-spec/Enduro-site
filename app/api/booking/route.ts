import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.BOOKING_TO_EMAIL;
    const fromEmail = process.env.BOOKING_FROM_EMAIL;

    if (!apiKey) {
      return Response.json(
        { error: "Missing RESEND_API_KEY." },
        { status: 500 }
      );
    }

    if (!toEmail) {
      return Response.json(
        { error: "Missing BOOKING_TO_EMAIL." },
        { status: 500 }
      );
    }

    if (!fromEmail) {
      return Response.json(
        { error: "Missing BOOKING_FROM_EMAIL." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

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
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New booking request from ${fullName}`,
      html: `
        <h2>New Booking Request</h2>

        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Experience:</strong> ${escapeHtml(experience)}</p>
        <p><strong>Package:</strong> ${escapeHtml(tourPackage)}</p>

        <p><strong>Details:</strong></p>
        <p>${escapeHtml(
          details || "No additional details provided."
        )}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

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
    console.error("Booking API error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}