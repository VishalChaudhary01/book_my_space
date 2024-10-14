import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     const session = await getServerSession(authOptions);
     if (session?.user) redirect("/");

     return (
          <div className="flex-center w-full">
               <main className="border-2 w-96 p-8 border-purple-2 rounded-md shadow-md">
                    {children}
               </main>
          </div>
     )
}
