import {useState} from "react"
import '../../assets/ExpandedMenu.css'

export default function ExpandedMenu() {
    const [closed, setClosed] = useState(false);

    return (
        <>
            <nav id="expanded-nav" className={closed ? "inactive" : "active"}>
                <div id="expanded-menu-wrapper">
                    <p onClick={() => setClosed(!closed)}>Close</p>
                    <ul id="categories">
                        <li><a className="category" id="art" href="/">Art</a></li>
                        <li><a className="category" id="diaspora" href="/">Black Body & Diaspora</a></li>
                        <li><a className="category" id="politics" href="/">Politics & Economics</a></li>
                        <li><a className="category" id="science" href="/">Science & Technology</a></li>
                        <li><a className="category" id="sports" href="/">Sports</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}