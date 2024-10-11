
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     return (
          <div>
               <main>{children}</main>
          </div>
     )
}
