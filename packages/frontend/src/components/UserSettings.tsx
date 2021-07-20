import React, { FC, useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    FormGroup,
    InputGroup,
    Button,
    Intent,
} from '@blueprintjs/core';
import './UserSettings.css';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError, LightdashUser, UpdateUserArgs, validateEmail } from 'common';
import { lightdashApi } from '../api';
import { useApp } from '../providers/AppProvider';
import PasswordInput from './PasswordInput';

const updateUserQuery = async (data: UpdateUserArgs) =>
    lightdashApi<LightdashUser>({
        url: `/user`,
        method: 'POST',
        body: JSON.stringify(data),
    });

const updateOrgQuery = async (data: { organizationName: string }) =>
    lightdashApi<undefined>({
        url: `/org`,
        method: 'POST',
        body: JSON.stringify(data),
    });

const updateUserPasswordQuery = async (data: {
    password: string;
    newPassword: string;
}) =>
    lightdashApi<undefined>({
        url: `/user/password`,
        method: 'POST',
        body: JSON.stringify(data),
    });

const Profile: FC = () => {
    const queryClient = useQueryClient();
    const { showError, showMessage, user } = useApp();
    const [firstName, setFirstName] = useState<string | undefined>(
        user.data?.firstName,
    );
    const [lastName, setLastName] = useState<string | undefined>(
        user.data?.lastName,
    );
    const [email, setEmail] = useState<string | undefined>(user.data?.email);

    const { isLoading, error, mutate } = useMutation<
        LightdashUser,
        ApiError,
        UpdateUserArgs
    >(updateUserQuery, {
        mutationKey: ['user_update'],
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            showMessage({
                title: 'User updated with success',
            });
        },
    });

    useEffect(() => {
        if (error) {
            const [title, ...rest] = error.error.message.split('\n');
            showError({
                title,
                subtitle: rest.join('\n'),
            });
        }
    }, [error, showError]);

    const handleUpdate = () => {
        if (firstName && lastName && email && validateEmail(email)) {
            mutate({
                firstName,
                lastName,
                email,
            });
        } else {
            const title =
                email && !validateEmail(email)
                    ? 'Invalid email'
                    : 'Required fields: first name, last name and email';
            showError({
                title,
                timeout: 3000,
            });
        }
    };

    return (
        <div
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <FormGroup
                label="First name"
                labelFor="first-name-input"
                labelInfo="(required)"
            >
                <InputGroup
                    id="first-name-input"
                    placeholder="Jane"
                    type="text"
                    required
                    disabled={isLoading}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormGroup>
            <FormGroup
                label="Last name"
                labelFor="last-name-input"
                labelInfo="(required)"
            >
                <InputGroup
                    id="last-name-input"
                    placeholder="Doe"
                    type="text"
                    required
                    disabled={isLoading}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormGroup>
            <FormGroup
                label="Email"
                labelFor="email-input"
                labelInfo="(required)"
            >
                <InputGroup
                    id="email-input"
                    placeholder="Email"
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                />
            </FormGroup>
            <div style={{ flex: 1 }} />
            <Button
                style={{ alignSelf: 'flex-end', marginTop: 20 }}
                intent={Intent.PRIMARY}
                text="Update"
                onClick={handleUpdate}
                loading={isLoading}
            />
        </div>
    );
};

const Password: FC = () => {
    const { showError } = useApp();
    const [password, setPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();

    const { isLoading, error, mutate } = useMutation<
        undefined,
        ApiError,
        { password: string; newPassword: string }
    >(updateUserPasswordQuery, {
        mutationKey: ['user_password_update'],
        onSuccess: () => {
            window.location.href = '/login';
        },
    });

    useEffect(() => {
        if (error) {
            const [title, ...rest] = error.error.message.split('\n');
            showError({
                title,
                subtitle: rest.join('\n'),
            });
        }
    }, [error, showError]);

    const handleUpdate = () => {
        if (password && newPassword) {
            mutate({
                password,
                newPassword,
            });
        } else {
            showError({
                title: 'Required fields: password and new password',
                timeout: 3000,
            });
        }
    };

    return (
        <div
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <PasswordInput
                label="Current password"
                placeholder="Enter your password..."
                required
                isLoading={isLoading}
                value={password}
                onChange={setPassword}
            />
            <PasswordInput
                label="New password"
                placeholder="Enter your new password..."
                required
                isLoading={isLoading}
                value={newPassword}
                onChange={setNewPassword}
            />
            <div style={{ flex: 1 }} />
            <Button
                style={{ alignSelf: 'flex-end', marginTop: 20 }}
                intent={Intent.PRIMARY}
                text="Update"
                onClick={handleUpdate}
                loading={isLoading}
            />
        </div>
    );
};

const Organization: FC = () => {
    const queryClient = useQueryClient();
    const { showError, showMessage, user } = useApp();
    const [organizationName, setOrganizationName] = useState<
        string | undefined
    >(user.data?.organizationName);

    const { isLoading, error, mutate } = useMutation<
        undefined,
        ApiError,
        { organizationName: string }
    >(updateOrgQuery, {
        mutationKey: ['user_update'],
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user']);
            showMessage({
                title: 'Organization name updated with success',
            });
        },
    });

    useEffect(() => {
        if (error) {
            const [title, ...rest] = error.error.message.split('\n');
            showError({
                title,
                subtitle: rest.join('\n'),
            });
        }
    }, [error, showError]);

    const handleUpdate = () => {
        if (organizationName) {
            mutate({
                organizationName,
            });
        } else {
            showError({
                title: 'Required fields: organization name',
                timeout: 3000,
            });
        }
    };

    return (
        <div
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <FormGroup
                label="Organization name"
                labelFor="organization-name-input"
                labelInfo="(required)"
            >
                <InputGroup
                    id="organization-name-input"
                    placeholder="Lightdash"
                    type="text"
                    required
                    disabled={isLoading}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                />
            </FormGroup>
            <div style={{ flex: 1 }} />
            <Button
                style={{ alignSelf: 'flex-end', marginTop: 20 }}
                intent={Intent.PRIMARY}
                text="Update"
                onClick={handleUpdate}
                loading={isLoading}
            />
        </div>
    );
};

const UserSettings: FC = () => (
    <div
        className="user-settings"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
        <Tabs
            id="user-settings"
            renderActiveTabPanelOnly
            vertical
            animate={false}
        >
            <Tab id="profile" title="Profile" panel={<Profile />} />
            <Tab id="password" title="Password" panel={<Password />} />
            <Tab
                id="organization"
                title="Organization"
                panel={<Organization />}
            />
            <Tabs.Expander />
        </Tabs>
    </div>
);

export default UserSettings;
