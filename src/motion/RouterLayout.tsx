// @flow
import * as React from 'react';
import {useEffect} from 'react';
import {useRouter} from "next/router";
import clsx from "clsx";
import Navbar from "../components/Navbar/Navbar";
import {RouterContext, RouterContextType} from "./RouterContext";

type Props = {
    children: React.ReactNode
};

const RouterLayout = (props: Props) => {


    const router = useRouter();
    const {
        changeBackgroundState,
        changeNextPage,
        changeLinkState,
        backgroundState
    } = React.useContext(RouterContext) as RouterContextType;


    useEffect(() => {
        let block = true;
        let timer_background: any = 0;
        // Show up first page
        changeLinkState(router.asPath, 'ANIMATE_SHOW');

        const handleRouteChange = (url: string, {shallow}: any) => {
            if (timer_background) {
                clearTimeout(timer_background);
            }
            if (block) {
                //Animate page A to hidden
                changeLinkState(router.asPath, 'ANIMATE_HIDE');
                //Animate background show up
                changeBackgroundState('ANIMATE_SHOW');

                // Wait animation finish
                setTimeout(() => {
                    router.push(url);
                }, 500);

                //prefetch next page during animation of current page
                router.prefetch(url);

                // Set url in the context to change navbar active menu before animation end
                changeNextPage(url);
                block = false;
                // Stop route change
                router.events.emit('routeChangeError');
                throw `routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.`;
            } else {
                //Bloc next page
                block = true;
            }
            console.log(
                `App is changing from ${router.asPath} to ${url} ${
                    shallow ? 'with' : 'without'
                } shallow routing`
            );
        }

        const handleRouteChangeComplete = (url: string, {shallow}: any) => {

            changeBackgroundState('ANIMATE_HIDE');

            changeLinkState(url, 'ANIMATE_SHOW');


            const element = document.querySelector('.main_content');

            element?.scrollTo(0, 0);
            console.log(
                `App has changed go to ${url} ${
                    shallow ? 'with' : 'without'
                } shallow routing`
            );
        }

        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteChangeComplete)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        }
    }, []);

    return (
        <div  >
            <Navbar/>
            {props.children}
        </div>
    );
};

export default RouterLayout