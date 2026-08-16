import { auth } from "@/auth";
import { getOwnedTurfIds } from "@/lib/turf-owner";
import { AuthButton } from "@/components/auth/AuthButton";

export default async function TurfOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const ownedTurfIds = await getOwnedTurfIds(session);

  if (ownedTurfIds.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl normal-case tracking-normal">
          Turf Owner Dashboard
        </h1>
        <p className="mt-3 text-ink/70">
          {session?.user
            ? "Ye account kisi turf se linked nahi hai. Agar aapka turf listed hai, Malhar Sports se apna email/phone confirm karwao."
            : "Sirf turf owners ke liye — pehle sign in karo (wahi email/phone jo Malhar Sports ko diya tha)."}
        </p>
        <div className="mt-6 flex justify-center">
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">{children}</div>
  );
}
