import { Meta } from '@storybook/react';
import { CardsCurrentDevice } from '@/widgets/profileSettings/devices/ui/CardsDevice/CardsDevice';
import { ChromeIcon } from '@/shared/assets/icons/ChromeIcon';
import { PhoneIcon } from "@/shared/assets/icons/Phone";
import React, {useState} from "react";

export default {
    component: CardsCurrentDevice,
    title: 'Components/CardsCurrentDevice',
    tags: ['autodocs'],
} as Meta<typeof CardsCurrentDevice>;

export const CardsCurrentDeviceDefault = (args:any) => {
    const [icon , setIcon ] = useState<React.ReactNode>(null)


    if (args.deviceName === 'iphone') {
        setIcon(<PhoneIcon />);
    } else if (args.deviceName === 'Mack') {
        setIcon(<ChromeIcon />);
    }

    return (
        <div>
            <CardsCurrentDevice {...args} icon={icon} />
        </div>
    );
};

CardsCurrentDeviceDefault.args = {
    IP: '11:11:11:11',
    deviceName: 'Iphone'||'Mack',
    icon:null
};