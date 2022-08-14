//
import React, {createContext, useState} from "react";

type AnimateStatus = 'ANIMATE_SHOW' | 'ANIMATE_HIDE';



export interface RouterContextType {
    //used to define the url who user have clicked
    nextPage?: string;
    //used to change the nextPage
    changeNextPage: (nextPage: string) => void;
    //used to animate the background
    backgroundState: AnimateStatus
    //used to defined if page if shown or hidden
    linksState: {
        [url: string]: AnimateStatus
    }
    changeLinkState: (url: string, state: AnimateStatus) => void
    //used to change backgroundState
    changeBackgroundState: (state: AnimateStatus) => void
}

export const RouterContext = createContext<RouterContextType | null>(null);

const RouterContextProvider = ({children}: { children: React.ReactNode }) => {

    const [linksState, setLinksState] = useState<RouterContextType["linksState"]>({});
    const [backgroundState, setBackgroundState] = useState<AnimateStatus>('ANIMATE_HIDE');
    const [nextPage, setNextPage] = useState<string | undefined>();

    return <RouterContext.Provider value={{
        linksState,
        backgroundState,
        nextPage,
        changeNextPage: setNextPage,
        changeBackgroundState: setBackgroundState,
        changeLinkState: (url, state) => {
            setLinksState({
                ...linksState,
                [url]: state
            })
        },
    }}>{children}</RouterContext.Provider>

};

export default RouterContextProvider