import { AlertTriangle, Check, X } from "lucide-react";
import type { ReactNode } from "react";
import { ZToastBase } from "./ZToastBase/ZToastBase";
import type { SlotProps as ZToastListSlotProps } from './ZToastBase/ZToastList/ZToastList';

type SlotProps = {
    ZToastList: ZToastListSlotProps;
}

type ZToastProps = {
    description?: string;
    title?: string;
    icon?: ReactNode;
    slotProps?: SlotProps;
    trigger?: ReactNode;
}

export const ZToast = {
    Success: ({ slotProps, description = 'הפעולה הושלמה בהצלחה', title = 'הודעת הצלחה', icon, trigger }: ZToastProps) =>
        <ZToastBase
            title={title}
            description={description}
            trigger={trigger}
            slotProps={{
                ZToastList: {
                    ...slotProps,
                    icon: slotProps?.ZToastList?.icon ?? <Check size='2rem' color='green' />
                },
                ZToastButton: {
                    icon
                }
            }}
        />,
    Error: ({ slotProps, description = 'הפעולה נכשלה', title = 'הודעת שגיאה', icon, trigger }: ZToastProps) =>
        <ZToastBase
            title={title}
            description={description}
            trigger={trigger}
            slotProps={{
                ZToastList: {
                    ...slotProps?.ZToastList,
                    icon: slotProps?.ZToastList?.icon ?? <X size='2rem' color="red" />
                },
                ZToastButton: {
                    icon
                }
            }}
        />,
    Info: ({ slotProps, description = 'הפעולה חזרה עם התראה', title = 'פעולת אזהרה', icon, trigger }: ZToastProps) =>
        <ZToastBase
            title={title}
            description={description}
            trigger={trigger}
            slotProps={{
                ZToastList: {
                    ...slotProps?.ZToastList,
                    icon: slotProps?.ZToastList?.icon ?? <AlertTriangle size='2rem' color="rgb(225, 193, 110)" />
                },
                ZToastButton: {
                    icon
                }
            }}
        />,
}