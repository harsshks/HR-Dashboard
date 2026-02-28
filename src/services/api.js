// ── Real API (uncomment and set correct URL when backend is ready) ──────────
// import axios from 'axios';
// const API_URL = 'https://your-real-backend.com/api/employees';
// export async function fetchEmployees() {
//     const response = await axios.post(
//         API_URL,
//         { username: 'test', password: '123456' },
//         { headers: { 'Content-Type': 'application/json' } }
//     );
//     return response.data;
// }

// ── Mock Data (used until the real backend is connected) ─────────────────────
const MOCK_EMPLOYEES = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@corp.in', department: 'Engineering', city: 'Bangalore', salary: 1850000, gender: 'Male', joining_date: '2021-03-15', role: 'Senior Dev' },
    { id: 2, name: 'Priya Mehta', email: 'priya.mehta@corp.in', department: 'Design', city: 'Mumbai', salary: 1400000, gender: 'Female', joining_date: '2022-07-01', role: 'UX Designer' },
    { id: 3, name: 'Rohan Gupta', email: 'rohan.gupta@corp.in', department: 'Engineering', city: 'Hyderabad', salary: 1650000, gender: 'Male', joining_date: '2020-11-20', role: 'Backend Dev' },
    { id: 4, name: 'Sneha Iyer', email: 'sneha.iyer@corp.in', department: 'HR', city: 'Chennai', salary: 1100000, gender: 'Female', joining_date: '2023-01-10', role: 'HR Manager' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@corp.in', department: 'Sales', city: 'Delhi', salary: 1300000, gender: 'Male', joining_date: '2019-06-05', role: 'Sales Lead' },
    { id: 6, name: 'Ananya Nair', email: 'ananya.nair@corp.in', department: 'Engineering', city: 'Pune', salary: 2100000, gender: 'Female', joining_date: '2018-09-12', role: 'Tech Lead' },
    { id: 7, name: 'Karan Patel', email: 'karan.patel@corp.in', department: 'Finance', city: 'Ahmedabad', salary: 1250000, gender: 'Male', joining_date: '2022-03-22', role: 'Analyst' },
    { id: 8, name: 'Divya Reddy', email: 'divya.reddy@corp.in', department: 'Design', city: 'Bangalore', salary: 1550000, gender: 'Female', joining_date: '2021-08-18', role: 'Product Designer' },
    { id: 9, name: 'Arjun Kumar', email: 'arjun.kumar@corp.in', department: 'Sales', city: 'Mumbai', salary: 1450000, gender: 'Male', joining_date: '2020-04-30', role: 'Sales Manager' },
    { id: 10, name: 'Meera Joshi', email: 'meera.joshi@corp.in', department: 'HR', city: 'Delhi', salary: 980000, gender: 'Female', joining_date: '2023-06-15', role: 'Recruiter' },
    { id: 11, name: 'Nikhil Verma', email: 'nikhil.verma@corp.in', department: 'Engineering', city: 'Hyderabad', salary: 1750000, gender: 'Male', joining_date: '2019-12-01', role: 'DevOps Eng.' },
    { id: 12, name: 'Pooja Desai', email: 'pooja.desai@corp.in', department: 'Finance', city: 'Pune', salary: 1200000, gender: 'Female', joining_date: '2022-10-05', role: 'Finance Lead' },
    { id: 13, name: 'Siddharth Rao', email: 'siddharth.rao@corp.in', department: 'Engineering', city: 'Chennai', salary: 1950000, gender: 'Male', joining_date: '2017-05-20', role: 'Architect' },
    { id: 14, name: 'Kavya Pillai', email: 'kavya.pillai@corp.in', department: 'Design', city: 'Bangalore', salary: 1350000, gender: 'Female', joining_date: '2023-02-28', role: 'UI Designer' },
    { id: 15, name: 'Rahul Bose', email: 'rahul.bose@corp.in', department: 'Sales', city: 'Kolkata', salary: 1150000, gender: 'Male', joining_date: '2021-11-14', role: 'BDE' },
];

export async function fetchEmployees() {
    // Simulate a small network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_EMPLOYEES;
}

