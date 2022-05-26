import React from "react";
import { UserSidebar } from "../../components/UserSidebar";

export const History = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserSidebar />
            </div>
            <div className="col">user history page</div>
        </div>
    </div>
);