import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './screens/auth/Login.jsx';
import Register from './screens/auth/Register.jsx';
import ForgotPassword from './screens/auth/ForgotPassword.jsx';
import NoticePage from './screens/notice/NoticePage.jsx';
import Announcements from './screens/announcements/Announcements.jsx';
import EditNotice from "./screens/notice/EditNotice.jsx";
import NoticeDetail from "./screens/notice/NoticeDetail.jsx";
import Layout from "./components/Layout.jsx";
import DashboardLayout from "./screens/dashboard/DashBoardLayout.jsx";
import ViewUserProfile from "./screens/user/ViewUserProfile.jsx";
import { Provider } from 'react-redux';
import { store } from './store.jsx';

function App() {
    // Example function to make a POST request
    const handlePost = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/posts', data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error posting the data!', error);
        }
    };

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/authentication/login" element={<Login />} />
                    <Route path="/authentication/register" element={<Register />} />
                    <Route path="/authentication/forgot-password" element={<ForgotPassword />} />

                    <Route path="/" element={<Layout />}>
                        <Route index element={<NoticePage />} />
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route path="announcements" element={<Announcements />} />
                            <Route path="notices/notice/:id" element={<NoticeDetail />} />
                            <Route path="notices/notice/edit/:id" element={<EditNotice />} />
                            <Route path="users/profile" element={<ViewUserProfile />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
