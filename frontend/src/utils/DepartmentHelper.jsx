import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S NO",
        selector: (row) => row.sno,
        width: "100px",
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-3">
            <button
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium shadow-md hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200"
            >
                Edit
            </button>
            <button
                onClick={() => onDepartmentDelete(_id)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium shadow-md hover:shadow-red-500/30 active:scale-95 transition-all duration-200"
            >
                Delete
            </button>
        </div>
    );
};

