import {TabsLayout} from '@/widgets/layouts'
import {CardsActiveDevice, CardsCurrentDevice} from "@/widgets/profileSettings/devices/ui/CardsDevice";
import {Button, Typography} from "@/shared/components";
import {ChromeIcon} from "@/shared/assets/icons/ChromeIcon";
import s from './Devices.module.scss'
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useDeleteAllMutation, useDeleteSessionMutation, useGetDevicesQuery} from "@/entities/device's";
import {useErrorHandler, useFetchLoader} from "@/shared/lib";
import {PhoneIcon} from "@/shared/assets/icons/Phone";
import React from 'react';

const Component = () => {
    const { accessToken} = useAuth()
    const {data, isLoading, error} = useGetDevicesQuery({accessToken})
    const [deleteDevice, {isLoading: deleteLoadingAll, error: deleteErrorAll}] = useDeleteAllMutation()

    const [deleteSessionDevice, { isLoading: deleteLoading, error: deleteError }] = useDeleteSessionMutation()

    useFetchLoader(isLoading || deleteLoading || deleteLoadingAll)

    useErrorHandler((deleteError || deleteLoading || deleteLoadingAll || deleteErrorAll) as CustomerError)
    const onClickHandler = () => {
        deleteDevice({accessToken})
    }

    const handleDeleteSession = () => {
        data && deleteSessionDevice({ deviceId: data[0].deviceId, accessToken })
    }
    const IconComponent = data && data[0].deviceType === 'phone'
        ? (data[0].osName === 'ios' ? <PhoneIcon/> : <PhoneIcon/>)
        : <ChromeIcon/>;

    return (
        <div>
            {data && data.length > 0 ? (
                <>
                    <Typography variant="h3">Current Device</Typography>
                    <CardsCurrentDevice key={data[0].deviceId} icon={IconComponent} IP={data[0].ip} deviceName={data[0].browserName}/>

                    <div className={s.button}>
                        <Button onClick={onClickHandler} variant="outline">
                            Terminate all other sessions
                        </Button>
                    </div>

                    <div className={s.spacer}></div>

                    {data.slice(0).map((device) => (
                        <React.Fragment key={device.deviceId}>
                            <Typography variant="h3">Active Sessions</Typography>
                            <CardsActiveDevice
                                key={device.deviceId}
                                visited={device.lastActive}
                                icon={IconComponent}
                                deviceName={device.osName}
                                IP={device.ip}
                                handleDeleteSession={handleDeleteSession}
                            />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export const Devices = () => {
    return (
        <TabsLayout>
            <Component/>
        </TabsLayout>
    )
}