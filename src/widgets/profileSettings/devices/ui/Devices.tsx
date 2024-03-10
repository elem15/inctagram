import {TabsLayout} from '@/widgets/layouts'
import {CardsActiveDevice, CardsCurrentDevice} from "@/widgets/profileSettings/devices/ui/CardsDevice";
import {Button, Typography} from "@/shared/components";
import {ChromeIcon} from "@/shared/assets/icons/ChromeIcon";
import s from './Devices.module.scss'
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useDeleteAllMutation, useDeleteSessionMutation, useGetDevicesQuery} from "@/entities/device's";
import {useErrorHandler, useFetchLoader} from "@/shared/lib";

const Component = () => {
    const {userId, accessToken, isAuth} = useAuth()
    const {data, isLoading, error} = useGetDevicesQuery({accessToken})
    const [deleteDevice, {isLoading: deleteLoading, error: deleteError}] = useDeleteAllMutation()
    useErrorHandler((deleteError || deleteLoading) as CustomerError)
    useFetchLoader(isLoading || deleteLoading)
    console.log(data)

    const onClickHandler = () => {
        deleteDevice({body: null, accessToken})
    }


    return (
        <div>
            {data && data.length > 0 ? (
                <>
                    <Typography variant="h3">Current Device</Typography>
                    <CardsCurrentDevice icon={<ChromeIcon/>} IP={data[0].ip} deviceName={data[0].browserName}/>

                    <div className={s.button}>
                        <Button onClick={onClickHandler} variant="outline">
                            Terminate all other sessions
                        </Button>
                    </div>

                    <div className={s.spacer}></div>

                    {data.slice(1).map((device) => (
                        <>
                            <Typography variant="h3">Active Sessions</Typography>
                            <CardsActiveDevice
                                key={device.deviceId}
                                visited={device.lastActive}
                                icon={<ChromeIcon/>}
                                deviceName={device.osName}
                                IP={device.ip}
                            />
                        </>
                    ))}
                </>
            ) : (
                <div>No devices found.</div>
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
