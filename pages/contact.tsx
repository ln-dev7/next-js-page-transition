// @flow
import * as React from 'react';
import styles from '../styles/Contact.module.scss'
import clsx from "clsx";
import {RouterContext, RouterContextType} from "../src/motion/RouterContext";
import Head from "next/head";


type Props = {};



export type dy = { [key: string]: string }


const Contact = (props: Props) => {

    // const [toggle, setToggle] = useState(false);
    const {linksState} = React.useContext(RouterContext) as RouterContextType;

    const toggle =
        (linksState['/contact'] || linksState[`/contact`] || 'ANIMATE_HIDE') === 'ANIMATE_HIDE'


    return (
        <React.Fragment>
            <Head>
                <title>Contact</title>
            </Head>
            <main className={clsx(styles.main, {
                [styles.hide_everything]: toggle
            })}>
                {/*<button onClick={() => setToggle(!toggle)} className={'toggle'}>*/}
                {/*    TOGGLE*/}
                {/*</button>*/}
                {
                    Array.from({ length: 5 })
                        .map((_, k) => <div style={{
                            transitionDelay: `${k * 50}ms`
                        }}/>)
                }
            </main>

        </React.Fragment>
    );
};


export default Contact