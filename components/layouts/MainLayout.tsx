import React, { FC } from 'react'
import { INavigation, MainContent, Sidebar } from '@components/ui';

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
