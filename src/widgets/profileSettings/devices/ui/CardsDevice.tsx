import React, {ReactNode} from "react";
import s from './CardsDevices.module.scss';
import {Typography} from "@/shared/components";
import {LogOut} from "lucide-react";


type Props = {
    icon: ReactNode;
    deviceName: string;
    IP: string;
    visited?: string
};

export const CardsCurrentDevice = ({IP, deviceName, icon, visited}: Props) => {

    return (
        <div className={s.cardsDevice}>
            <svg className={s.icon}>{icon}</svg>
            <div className={s.details}>
                <Typography className={s.name} variant={'h3'}>{deviceName}</Typography>
                <Typography className={s.ip} variant={'small_text'}>IP:{IP}</Typography>
            </div>

        </div>
    );
};


export const CardsActiveDevice = ({IP, deviceName, icon, visited}: Props) => {


    return (
        <div className={s.cardsDevice}>
            <svg className={s.icon}>{icon}</svg>
            <div className={s.details}>
                <Typography variant={'h3'} className={s.name}>{deviceName}</Typography>
                <Typography className={s.ip} variant={'small_text'}>IP:{IP}</Typography>
                <Typography variant={'small_text'}>{visited}</Typography>
            </div>
            <div className={s.button} >
                <LogOut/>
                <Typography>Log Out</Typography>
            </div>

        </div>
    );
};