import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RatingDoctor from "./components/RatingDoctor/RatingDoctor";


export default function App() {

    return (
        <>
            <Header/>
               <RatingDoctor/>
            <Footer/>

        </>
    )
}
