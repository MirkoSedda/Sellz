import { AdminSidebar } from "../../components/AdminSidebar"

export const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar />
                </div>
                <div className="col">admin dashboard page</div>
            </div>
        </div>
    )
}
