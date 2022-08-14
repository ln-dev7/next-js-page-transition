import * as React from 'react';
import styles from './Navbar.module.scss'
import clsx from "clsx";
import Link from "next/link";
import {useRouter} from "next/router";
import {RouterContext, RouterContextType} from "../../motion/RouterContext";


type Props = {};


const links: MenuItemProps[] = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
]

const Navbar = (props: Props) => {


    return (
        <nav className={clsx(styles.root, 'background-primary')}>
            <ul>
                {
                    links.map(link => <MenuItem key={link.label} {...link} />)
                }
            </ul>
        </nav>
    );
};

interface MenuItemProps {
    label: string
    href: string
}

const MenuItem = (props: MenuItemProps) => {
    const router = useRouter();
    const {nextPage} = React.useContext(RouterContext) as RouterContextType;

    const active = (nextPage || router.pathname) === props.href ||
        (nextPage || router.pathname) === `/${props.href}` ||

        (((nextPage || router.pathname) === `/` || (nextPage || router.pathname) === `/`) && props.href === '/');

    return <Link href={props.href}>
        <li
            className={clsx({
                [styles.active]: active
            })}>
            <a
                href={props.href}>
                {props.label}
            </a>
        </li>
    </Link>
}

export default Navbar