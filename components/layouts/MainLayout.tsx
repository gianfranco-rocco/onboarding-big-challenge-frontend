import React, { FC } from 'react'
import { INavigation, MainContent } from '../ui';
import { Sidebar } from '../ui/Sidebar';

interface Props {
    children: React.ReactNode;
    navigation: INavigation[];
    profilePageHref?: string;
}

export const MainLayout: FC<Props> = ({ children, navigation, profilePageHref }) => {
    return (
        <Sidebar navigation={navigation} profilePageHref={profilePageHref}>
            <MainContent>{children}</MainContent>
        </Sidebar>
    )
}
