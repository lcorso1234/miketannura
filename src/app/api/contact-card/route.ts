import { NextRequest } from "next/server";

const escapeVCardValue = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");

const sanitizeFilePart = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name")?.trim() ?? "";
  const email = searchParams.get("email")?.trim() ?? "";
  const phone = searchParams.get("phone")?.trim() ?? "";

  if (!name || !email || !phone) {
    return new Response(
      JSON.stringify({
        error: "Missing required query params: name, email, phone",
      }),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
  }

  const escapedName = escapeVCardValue(name);
  const escapedEmail = escapeVCardValue(email);
  const escapedPhone = escapeVCardValue(phone);
  const phoneDigits = phone.replace(/[^\d+]/g, "");
  const escapedPhoneDigits = escapeVCardValue(phoneDigits);

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapedName}`,
    // Keep both TEL formats for broader iOS Contacts + Samsung import compatibility.
    `TEL;TYPE=CELL,VOICE:${escapedPhone}`,
    `TEL:${escapedPhoneDigits}`,
    `EMAIL;TYPE=INTERNET:${escapedEmail}`,
    "END:VCARD",
    "",
  ].join("\r\n");

  const fileNameBase = sanitizeFilePart(name) || "shared-contact";
  const fileName = `${fileNameBase}.vcf`;

  return new Response(vCard, {
    status: 200,
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": `attachment; filename="${fileName}"`,
      "cache-control": "no-store",
    },
  });
}
