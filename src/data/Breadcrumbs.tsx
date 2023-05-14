import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

interface BreadcrumbsProps {
    location: string
}

function Breadcrumbs({ location }: BreadcrumbsProps) {
    var element = "cursor-pointer px-3 hover:text-purple-400 transition duration-100 ease-in" 
    const navigate = useNavigate();
    
    return (
        <div className="breadcrumbs flex items-center text-xs text-black opacity-70 py-5">
            <p onClick={()=> navigate("/")} className={element}>Home</p>
            <FontAwesomeIcon icon={faChevronRight} />
            <p className={element} >Shopping cart</p>
        </div>
    )
}

export default Breadcrumbs