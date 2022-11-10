import React, { FC } from 'react'
import { INavigation, MainContent } from '../ui';
import { Sidebar } from '../ui/Sidebar';

interface Props {
    children: React.ReactNode;
    navigation: INavigation[];
}

export const MainLayout: FC<Props> = ({ children, navigation }) => {
    return (
        <Sidebar navigation={navigation}>
            <MainContent>{children}</MainContent>
        </Sidebar>
    )
}
