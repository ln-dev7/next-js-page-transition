import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import * as React from "react";
import clsx from "clsx";
import {RouterContext, RouterContextType} from "../src/motion/RouterContext";

const Home: NextPage = () => {
    // const router = useRouter();
    // const [toggle, setToggle] = useState(false);
    const {
        linksState,
    } = React.useContext(RouterContext) as RouterContextType;

    const toggle = (linksState['/'] || 'ANIMATE_HIDE') === 'ANIMATE_HIDE';


    return (
        <React.Fragment>
            {/*Using to test animation without change pages*/}
            {/*<button onClick={() => setToggle(!toggle)} className={'toggle'}>*/}
            {/*    TOGGLE*/}
            {/*</button>*/}
            <section className={clsx(styles.main, {
                [styles.hide_everything]: toggle
            })}>
                {
                    Array.from({ length: 5 })
                        .map((_, k) => <div style={{
                            transitionDelay: `${k * 50}ms`
                        }}/>)
                }
            </section>
        </React.Fragment>
    )
}

export default Home
