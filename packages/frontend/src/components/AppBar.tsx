import React, { useEffect, useState } from 'react';
import {
    Alignment,
    Button,
    Dialog,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { useMutation } from 'react-query';
import { lightdashApi } from '../api';
import { useApp } from '../providers/AppProvider';
import UserSettings from './UserSettings';

const logoutQuery = async () =>
    lightdashApi({
        url: `/logout`,
        method: 'GET',
        body: undefined,
    });

const AppBar = () => {
    const { user } = useApp();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { isLoading, status, mutate } = useMutation(logoutQuery, {
        mutationKey: ['logout'],
    });

    useEffect(() => {
        if (status === 'success') {
            window.location.href = '/login';
        }
    }, [status]);

    return (
        <>
            <Navbar style={{ position: 'sticky', top: 0 }}>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarHeading style={{ marginRight: 5 }}>
                        {user.data?.firstName} {user.data?.lastName}
                    </NavbarHeading>
                    <NavbarDivider />
                    <Tooltip2 content="Settings">
                        <Button
                            icon="cog"
                            minimal
                            intent="none"
                            loading={isLoading}
                            onClick={() => setIsSettingsOpen(true)}
                        />
                    </Tooltip2>
                    <Tooltip2 content="Logout">
                        <Button
                            icon="log-out"
                            minimal
                            intent="danger"
                            loading={isLoading}
                            onClick={() => mutate()}
                        />
                    </Tooltip2>
                </NavbarGroup>
            </Navbar>
            <Dialog
                isOpen={isSettingsOpen}
                icon="cog"
                onClose={() => setIsSettingsOpen(false)}
                title="Settings"
                lazy
                canOutsideClickClose={false}
                style={{ paddingBottom: 0, minWidth: 700, minHeight: 500 }}
            >
                <UserSettings />
            </Dialog>
        </>
    );
};

export default AppBar;
