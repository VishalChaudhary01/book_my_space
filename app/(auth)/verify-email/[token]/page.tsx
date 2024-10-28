import { verifyEmail } from "@/app/actions/auth.action"
import { Button } from "@/components/ui/button";
import { VerificationLinkExpired } from "@/components/VerificationLinkExpired";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EmailVerificationPage({ params: { token } }: { params: { token: string } }) {
     const response = await verifyEmail({ token });
     if (response?.error === "Link expired!") {
          return <VerificationLinkExpired token={token} />
     } else if (!response.success) {
          return redirect('/signup');
     }
     return <EmailVerifiedSuccess />;
}

function EmailVerifiedSuccess() {
     return (
          <>
               <div className="text-2xl font-semibold pb-4">
                    Email has been successfully Verified!
               </div>
               <Link href={'/signin'} className="flex-center">
                    <Button className="bg-purple-1 hover:bg-purple-3">Sign in</Button>
               </Link>
          </>
     )
}