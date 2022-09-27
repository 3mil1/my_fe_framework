import VDom from "../framework/Vdom";
import "./styles.css";
import {Li} from "./li_example/li";
import {Router} from "./router/router";

export function App({state}) {
    return (
        <Router/>
    )
}

// function Nav() {
//     return (
//         <nav>
//             <ul>
//                 <li><Link to="/">LI</Link></li>
//                 <li><Link to="/page_not_exist">404 page</Link></li>
//             </ul>
//         </nav>
//     )
// }


// function Content() {
//     return (
//         <Switch>
//             <Route path="/" exact>
//                 <Li/>
//             </Route>
//             <Route path=".*">
//                 <NotFound/>
//             </Route>
//         </Switch>
//     )
// }

