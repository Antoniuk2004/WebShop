import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

interface BreadcrumbsProps {
    location: any
}
function Breadcrumbs({ location }: BreadcrumbsProps) {
    var element = "cursor-pointer hover:text-purple-500 transition duration-100 ease-in"
    const navigate = useNavigate();

    const breadcrumbsElements = String(location.pathname).slice(1).split("/")
    breadcrumbsElements.unshift("home")

    function CheckIfLast(element: any) {
        if (breadcrumbsElements.indexOf(element) == breadcrumbsElements.length - 1) {
            return true
        }
        else return false
    }

    function handleRedirect(element: any){
        if(element == "home") navigate("/")
        else if(CheckIfLast(element)) return null
        else navigate(`/${element}`)
    }

    return (
        <div className="breadcrumbs flex items-center text-xs text-black opacity-70 py-5 gap-2">
            {breadcrumbsElements.map((element) => (
                <div className="element flex items-center gap-2">
                    <p
                        onClick={() => handleRedirect(element)}
                        className="capitalize cursor-pointer"
                    >{element.replaceAll("_", " ")}</p>
                    {CheckIfLast(element) ? null : <FontAwesomeIcon icon={faChevronRight} />}
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs