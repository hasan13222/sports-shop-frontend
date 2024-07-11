import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";




const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    }
])

export default router;