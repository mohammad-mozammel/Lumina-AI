import Brand from "@/components/shared/Brand";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="auth">
            <div className="auth-brand">
                <Brand />
                <span>AI image creation & transformation studio</span>
            </div>
            {children}
        </main>
    );
};

export default Layout;
