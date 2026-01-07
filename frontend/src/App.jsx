import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Privateroutes from "./utils/Privateroutes";
import Rolebasedroutes from "./utils/Rolebasedroutes";
import Adminsummary from "./components/dashboard/Adminsummary";
import Departmentlist from "./components/Departments/Departmentlist";
import Adddepartment from "./components/Departments/Adddepartment";
import Employeelist from "./components/Employees/Employeelist";
import Leaveslist from "./components/Leaves/Leaveslist";
import Salarylist from "./components/Salary/Salarylist";
import Settings from "./components/Settings/Settings";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <Privateroutes>
              <Rolebasedroutes requiredRole={["admin"]}>
                <AdminDashboard />
              </Rolebasedroutes>
            </Privateroutes>
          }
        >
          <Route index element={<Adminsummary />}></Route>
          <Route path="departments" element={<Departmentlist />}></Route>
          <Route path="add-department" element={<Adddepartment />}></Route>
          <Route path="employees" element={<Employeelist />}></Route>
          <Route path="leaves" element={<Leaveslist />}></Route>
          <Route path="salary" element={<Salarylist />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;