import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FooterAdmin = () => {
    return (
        <div className="container-fluid mt-auto">
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary rounded-top p-4 text-white text-center">
                    &copy; <a href="#" className="text-white">Your Site Name</a>, All Rights Reserved.
                    <br />
                    Designed By <a href="https://htmlcodex.com" className="text-white">HTML Codex</a> | Distributed By: <a href="https://themewagon.com" className="text-white">ThemeWagon</a>
                </div>
            </div>
        </div>
    );
}

export default FooterAdmin;
// Compare this snippet from src/view/pages/admin/layout/header.jsx: