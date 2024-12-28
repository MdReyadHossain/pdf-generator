import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PdfGenerater from '../components/PdfGenerater';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PdfGenerater />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
