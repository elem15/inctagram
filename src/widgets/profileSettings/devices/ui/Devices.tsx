import {TabsLayout} from '@/widgets/layouts'
import {CardsCurrentDevice} from "@/widgets/profileSettings/devices/ui/CardsDevice";
import {Button, Typography} from "@/shared/components";
import {ChromeIcon} from "@/shared/assets/icons/ChromeIcon";
import s from './Devices.module.scss'
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useDeleteSessionMutation, useGetDevicesQuery} from "@/entities/device's";
import {useErrorHandler, useFetchLoader} from "@/shared/lib";

const Component = () => {
    const {userId, accessToken, isAuth} = useAuth()
    const {data, isLoading, error} = useGetDevicesQuery({accessToken})
    const [deleteDevice, {isLoading: deleteLoading, error: deleteError}] = useDeleteSessionMutation()
    useErrorHandler((deleteError || deleteLoading) as CustomerError)
    useFetchLoader(isLoading || deleteLoading)
    console.log(data)

    return (
        <div>
            <Typography variant={'h3'}>Current Device</Typography>
            <CardsCurrentDevice icon={<ChromeIcon/>} IP={data!.ip} deviceName={data!.deviceName}/>
            <div className={s.button}>
                <Button variant={'outline'}>Terminate all other session</Button>
            </div>

            <div className={s.spacer}></div>
            {/*<Typography variant={'h3'}> Active session </Typography>*/}
            {/*<CardsActiveDevice visited={'11.01.2024'} icon={<ChromeIcon/>} deviceName={'ssdsd'} IP={'123.321.123.312'}/>*/}
            {/*<CardsActiveDevice visited={'11.01.2024'} icon={<ChromeIcon/>} deviceName={'sdsd'} IP={'123.321.123.312'}/>*/}
        </div>
    )
}

export const Devices = () => {
    return (
        <TabsLayout>
            <Component/>
        </TabsLayout>
    )
}
