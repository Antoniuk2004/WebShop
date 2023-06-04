import { useNavigate } from 'react-router-dom';

function WrongPage() {
    const navigate = useNavigate();
    function MoveToHome() {
        navigate("/");
    }
    return (
        <div className='center grid place-items-center h-screen'>
            <div className="ERROR404 container mx-auto text-center ">
                <h1 className="text-9xl text-bold text-purple-400">404</h1>
                <p className="text-6xl pt-10 uppercase opacity-80">opps! page not found</p>
                <p className="text-3xl pt-6 opacity-80">Sorry, the page you're looking for doesn't exist.</p>
                <button onClick={() => MoveToHome()} className="btn bg-purple-400 mt-6 hover:bg-purple-500 transition duration-300 rounded-xl text-2xl py-3 my-2 text-white px-40">Return Home</button>
            </div>
        </div>

    )
}
export { WrongPage }